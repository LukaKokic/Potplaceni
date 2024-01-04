CREATE OR REPLACE FUNCTION api.fn_delete_transporter_vehicle(IN delete_vehicle json)
    RETURNS json
    LANGUAGE 'plpgsql'
    
AS $BODY$
declare
	returnValue json := '{"success": false, "msg": "Could not delete"}'::json;
	vehicle_id integer := (delete_vehicle->>'id')::integer;
	
begin
	if (select count(*) from public.vehicle where vehicleid = vehicle_id) = 0 then
		return returnValue;
	end if;
	
	delete from public.vehicle where vehicleid = vehicle_id;
	delete from public.vehicleschedule where vehicleid = vehicle_id;
	returnValue := json_build_object(
		'success', true,
		'msg', 'Vehicle deleted'
	);
	
	return returnValue;
end;
$BODY$;

ALTER FUNCTION api.fn_delete_transporter_vehicle(json)
    OWNER TO dentall_rmm2_user;