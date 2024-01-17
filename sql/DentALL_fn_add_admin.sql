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
	returnValue json := json_build_object(
			'success', false,
			'msg', 'Could not create user'
		);
	new_userID integer;
	rLArray integer[];
begin
	if (select count(*) from public.adminuser au where au.pin = (new_admin_data->>'PIN')::integer) = 0 then
		insert into public.adminuser (pin, firstname, lastname, phone, email)
		values ((new_admin_data->>'PIN')::integer, (new_admin_data->>'firstname')::varchar, (new_admin_data->>'lastname')::varchar, (new_admin_data->>'phone')::varchar, (new_admin_data->>'email')::varchar)
		returning userid into new_userID;
		
		select array(
			select json_array_elements_text(new_admin_data->'roleList')::integer
		) into rLArray;
		
		perform public.fn_create_credentials();
		perform public.fn_assign_new_roles(rLArray, new_userID);
		
		returnValue := json_build_object(
			'success', true,
			'msg', 'New admin created'
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

