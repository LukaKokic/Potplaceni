CREATE FUNCTION public."fn_create_credentials"()
    RETURNS void
    LANGUAGE 'plpgsql'
    
AS $BODY$
begin
	insert into auth.credentials(
		username, pass, userid)
	select
		left(firstname, 1) || left(lastname, 1) || right(pin::varchar, 4) username,
		left(MD5(pin::varchar), 8) pass,
		userid
	from
		public.adminuser
	order by userid desc
	limit 1;
end;
$BODY$;

ALTER FUNCTION public."fn_createCredentials"()
    OWNER TO dentall_rmm2_user;

GRANT EXECUTE ON FUNCTION public."fn_createCredentials"() TO PUBLIC;

GRANT EXECUTE ON FUNCTION public."fn_createCredentials"() TO app_api;

GRANT EXECUTE ON FUNCTION public."fn_createCredentials"() TO auth_api;

GRANT EXECUTE ON FUNCTION public."fn_createCredentials"() TO dentall_rmm2_user;

GRANT EXECUTE ON FUNCTION public."fn_createCredentials"() TO postgres;