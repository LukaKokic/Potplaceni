-- FUNCTION: public.fn_get_clinics()

-- DROP FUNCTION IF EXISTS public.fn_get_clinics();

CREATE OR REPLACE FUNCTION public.fn_get_clinics(
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
				'id', clinicid,
				'name', clinicname
			)
		)
	from
		clinic;
	
	return returnValue;
end
	
$BODY$;

ALTER FUNCTION public.fn_get_clinics()
    OWNER TO dentall_rmm2_user;
