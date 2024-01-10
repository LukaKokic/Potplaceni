-- FUNCTION: public.fn_get_roles()

-- DROP FUNCTION IF EXISTS public.fn_get_roles();

CREATE OR REPLACE FUNCTION public.fn_get_roles(
	)
    RETURNS json
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
declare
	returnValue json;
	
begin
	select into
		returnValue json_agg(
			json_build_object(
				'id', roleid,
				'rName', rolename
			)
		)
	from
		public.userrole;
		
	return returnValue;
end
$BODY$;

ALTER FUNCTION public.fn_get_roles()
    OWNER TO dentall_rmm2_user;
