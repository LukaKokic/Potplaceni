CREATE FUNCTION api.fn_update_admin_info(IN updated_data json)
    RETURNS json
    LANGUAGE 'plpgsql'
    
AS $BODY$
declare 
	returnValue json := '{"success": false, "msg": "User info not updated"}';
	user_ID integer := (updated_data->>'userID')::integer;
	rL_array integer[];
begin
	select array(
		select json_array_elements_text(updated_data->'roleList')::integer
	) into rL_array;
	
	update 
		public.adminuser 
	set 
		phone = (updated_data->>'phone'),
		email = (updated_data->>'email')
	where
		userid = user_ID;
		
	perform public.fn_assign_new_roles(rL_array, user_ID);
	
	returnValue := 	json_build_object(
		'success', true,
		'msg', 'Updated user info'
	);
	
	return returnValue;
end;		
$BODY$;

ALTER FUNCTION api.fn_update_admin_info(json)
    OWNER TO dentall_rmm2_user;