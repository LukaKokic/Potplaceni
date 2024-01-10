-- FUNCTION: api.fn_add_admin(json)

-- DROP FUNCTION IF EXISTS api.fn_add_admin(json);

CREATE OR REPLACE FUNCTION api.fn_add_admin(
	new_admin_data json)
    RETURNS json
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
declare
	returnValue json;
	admin_pin integer := (new_admin_data->>'PIN')::integer;
	f_name varchar := (new_admin_data->>'firstname')::varchar;
	l_name varchar := (new_admin_data->>'lastname')::varchar;
	ph varchar := (new_admin_data->>'phone')::varchar;
	mail varchar := (new_admin_data->>'email')::varchar;
	rL_array integer[];
	new_userid integer;
	
begin
	select array(
		select json_array_elements_text(new_admin_data->'roleList')::integer
	) into rL_array;
	
	if (select count(*) from public.adminuser au where au.pin = admin_pin) = 0 then
		insert into public.adminuser (pin, firstname, lastname, phone, email)
		values (admin_pin, f_name, l_name, ph, mail);
		
		select 
			userid
		into
			new_userid
		from
			public.adminuser
		order by
			userid desc
		limit 1;
			
		perform public.fn_assign_new_roles(rL_array, new_userid);
		
		perform public.fn_create_credentials();
		
		returnValue := json_build_object(
			'success', true,
			'msg', 'New admin created'
		);
	end if;
	if returnValue is null then	
		returnValue := json_build_object(
			'success', false,
			'msg', 'Could not create user'
		);
	end if;
	
	return returnValue;
end;
$BODY$;

ALTER FUNCTION api.fn_add_admin(json)
    OWNER TO dentall_rmm2_user;

GRANT EXECUTE ON FUNCTION api.fn_add_admin(json) TO PUBLIC;

GRANT EXECUTE ON FUNCTION api.fn_add_admin(json) TO app_api;

GRANT EXECUTE ON FUNCTION api.fn_add_admin(json) TO auth_api;

GRANT EXECUTE ON FUNCTION api.fn_add_admin(json) TO dentall_rmm2_user;

GRANT EXECUTE ON FUNCTION api.fn_add_admin(json) TO postgres;

