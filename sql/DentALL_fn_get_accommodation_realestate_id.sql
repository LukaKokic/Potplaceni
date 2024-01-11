-- FUNCTION: public.fn_get_accommodation_last_id()

-- DROP FUNCTION IF EXISTS public.fn_get_accommodation_last_id();

CREATE OR REPLACE FUNCTION public.fn_get_accommodation_last_id(
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
		returnValue json_build_object(
			'lastID', realestateid
		)
	from
		accommodation
	order by
		accommodationid desc
	limit 1;
	
	return returnValue;
end
$BODY$;

ALTER FUNCTION public.fn_get_accommodation_last_id()
    OWNER TO dentall_rmm2_user;
