CREATE OR REPLACE FUNCTION api.fn_change_password(IN data_in json)
    RETURNS json
    LANGUAGE 'plpgsql'
    
AS $BODY$
declare
	user_ID integer := (data_in->>'userID')::integer;
	new_pass varchar := (data_in->>'pass')::varchar;
	returnValue json := json_build_object(
		'success', false,
		'msg', 'Could not change password'
	);
begin
	update 
		auth.credentials
	set
		pass = left(MD5(new_pass), 8)
	where
		userid = user_ID;
	
	returnValue := json_build_object(
		'success', true,
		'msg', 'Password has been changed'
	);
	
	return returnValue;
end;
$BODY$;

ALTER FUNCTION api.fn_change_password(json)
    OWNER TO dentall_rmm2_user;