-- FUNCTION: api.fn_login(json)

-- DROP FUNCTION IF EXISTS api.fn_login(json);

CREATE OR REPLACE FUNCTION api.fn_login(
	user_data json)
    RETURNS json
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
declare
	returnValue json;
	
begin
select
into
	returnValue
	json_build_object(
		'success', true,
		'user_id', cred.userid,
		'username', cred.username,
		'roleid', ar.roleid,
		'rolename', ur.rolename,
		'msg', 'Hello User'
	)
from
	auth.credentials cred
join
	public.assignedrole ar
on	cred.userid = ar.userid
join
	userrole ur
on	ar.roleid = ur.roleid
where
	username = (user_data->>'username')
and	pass = (user_data->>'password');

if returnValue is null then
	returnValue := json_build_object(
		'success', false,
		'msg', 'Sorry blake, WRONG'
	);
end if;

return returnValue;

end;
$BODY$;

ALTER FUNCTION api.fn_login(json)
    OWNER TO dentall_rmm2_user;

GRANT EXECUTE ON FUNCTION api.fn_login(json) TO PUBLIC;

GRANT EXECUTE ON FUNCTION api.fn_login(json) TO app_api;

GRANT EXECUTE ON FUNCTION api.fn_login(json) TO auth_api;

GRANT EXECUTE ON FUNCTION api.fn_login(json) TO dentall_rmm2_user;

GRANT EXECUTE ON FUNCTION api.fn_login(json) TO postgres;

