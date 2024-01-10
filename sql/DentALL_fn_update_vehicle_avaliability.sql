CREATE OR REPLACE FUNCTION api.fn_update_vehicle_avaliability(IN vehicle_update json)
    RETURNS json
    LANGUAGE 'plpgsql'
    
AS $BODY$
declare
	returnValue json;
	av bit := (vehicle_update->>'avaliable')::bit;
begin
	update 
		public.vehicle
	set
		active = av
	where
		vehicleid = (vehicle_update->>'id')::integer;
	
	returnValue := json_build_object(
		'success', true,
		'msg', 'Updated vehicle avaliability'
	);
	
	return returnValue;
	
end;
$BODY$;

ALTER FUNCTION api.fn_update_vehicle_avaliability(json)
    OWNER TO dentall_rmm2_user;