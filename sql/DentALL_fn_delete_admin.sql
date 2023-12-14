CREATE OR REPLACE FUNCTION api.fn_delete_admin(IN data_in json)
    RETURNS json
    LANGUAGE 'plpgsql'
    
AS $BODY$
declare
	returnValue json:= json_build_object(
			'success', true,
			'msg', 'Admin deleted'
		);

begin
	if (select count(*) from public.adminuser where userid = (data_in->>'userID')::integer) = 0 then
		returnValue := json_build_object(
			'success', false,
			'msg', 'Admin could not be deleted'
		);
	end if;

	delete from public.adminuser where userid = (data_in->>'userID')::integer;
	
	return returnValue;
end;
$BODY$;

ALTER FUNCTION api.fn_delete_admin(json)
    OWNER TO dentall_rmm2_user;