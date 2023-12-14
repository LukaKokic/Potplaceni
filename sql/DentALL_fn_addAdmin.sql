CREATE OR REPLACE FUNCTION api.fn_add_admin(IN new_admin_data json)
    RETURNS json
    LANGUAGE 'plpgsql'
    VOLATILE PARALLEL UNSAFE
AS $BODY$
declare
	returnValue json := json_build_object(
			'success', false,
			'msg', 'Could not create user'
		);
	
begin
	if (select count(*) from public.adminuser au where au.pin = (new_admin_data->>'PIN')::integer) = 0 then
		insert into public.adminuser (pin, firstname, lastname, phone, email)
		values ((new_admin_data->>'PIN')::integer, (new_admin_data->>'firstname')::varchar, (new_admin_data->>'lastname')::varchar, (new_admin_data->>'phone')::varchar, (new_admin_data->>'email')::varchar);
		
		perform public.fn_create_credentials();
		
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