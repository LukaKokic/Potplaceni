CREATE FUNCTION api.fn_view_admins()
    RETURNS json
    LANGUAGE 'plpgsql'
    
AS $BODY$
declare
	returnValue json;
	
begin

select into
	returnValue json_agg(
		json_build_object(
			'userID', au.userid,
			'pin', au.pin,
			'name', au.firstname,
			'surname', au.lastname,
			'contact', au.phone,
			'mail', au.email
		)
	)
from
	public.adminuser au;
	
return returnValue;

end;
$BODY$;

ALTER FUNCTION api.fn_view_admins()
    OWNER TO dentall_rmm2_user;