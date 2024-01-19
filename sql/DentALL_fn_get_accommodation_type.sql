CREATE OR REPLACE FUNCTION public.fn_get_accommodation_types()
    RETURNS json
    LANGUAGE 'plpgsql'
    
AS $BODY$
declare
	returnValue json;
	
begin
	select into 
	returnValue json_agg(
		json_build_object(
			'id', typeid,
			'type', description
		)
	)
	from
		public.accommodationtype;
	return returnValue;
end;
$BODY$;

ALTER FUNCTION public.fn_get_accommodation_types()
    OWNER TO dentall_rmm2_user;