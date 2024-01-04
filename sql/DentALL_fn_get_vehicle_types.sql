CREATE FUNCTION public.fn_get_vehicle_types()
    RETURNS json
    LANGUAGE 'plpgsql'
    
AS $BODY$
declare
	returnValue json;
	
begin
	select into 
	returnValue json_agg(
		json_build_object(
			'typeID', typeid,
			'desc', description
		)
	)
	from
		public.vehicletype;
	return returnValue;
end;
$BODY$;

ALTER FUNCTION public.fn_get_vehicle_types()
    OWNER TO dentall_rmm2_user;