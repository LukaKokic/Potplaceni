-- FUNCTION: public.fn_get_treatments()

-- DROP FUNCTION IF EXISTS public.fn_get_treatments();

CREATE OR REPLACE FUNCTION public.fn_get_treatments(
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
				'id', treatmentid,
				'name', treatmentname,
				'desc', description
			)
		)
	from
		public.treatment;
	
	return returnValue;
end
	
$BODY$;

ALTER FUNCTION public.fn_get_treatments()
    OWNER TO dentall_rmm2_user;
