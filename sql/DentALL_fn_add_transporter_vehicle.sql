-- FUNCTION: api.fn_add_transporter_vehicle(json)

-- DROP FUNCTION IF EXISTS api.fn_add_transporter_vehicle(json);

CREATE OR REPLACE FUNCTION api.fn_add_transporter_vehicle(
	new_vehicle_data json)
    RETURNS json
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
declare
	returnValue json := '{"success": false, "msg": "Could not add transporter vehicle"}'::json;
	reg varchar := (new_vehicle_data->>'registration')::varchar;
	cap smallint := (new_vehicle_data->>'capacity')::smallint;
	type_id smallint := (new_vehicle_data->>'type')::smallint;
	vehicle_brand varchar := (new_vehicle_data->>'brand')::varchar;
	brand_model varchar := (new_vehicle_data->>'model')::varchar;
	trans_id integer := (new_vehicle_data->>'transporter_id')::integer;
	acc bit := (new_vehicle_data->>'active')::bit;
	l_vid integer;
	
begin
	if (select count(*) from public.vehicle where registration = reg) = 0 then
		INSERT INTO public.vehicle (registration, capacity, typeid, brand, model, transporterid, active)
		VALUES (reg, cap, type_id, vehicle_brand, brand_model, trans_id, acc)
		returning vehicleid into l_vid;
		
		returnValue := json_build_object(
			'success', true,
			'msg', 'Vehicle added'
		);
		
		perform public.fn_create_schedule(l_vid);
	end if;
	
	return returnValue;
end
$BODY$;

ALTER FUNCTION api.fn_add_transporter_vehicle(json)
    OWNER TO dentall_rmm2_user;

GRANT EXECUTE ON FUNCTION api.fn_add_transporter_vehicle(json) TO PUBLIC;

GRANT EXECUTE ON FUNCTION api.fn_add_transporter_vehicle(json) TO app_api;

GRANT EXECUTE ON FUNCTION api.fn_add_transporter_vehicle(json) TO auth_api;

GRANT EXECUTE ON FUNCTION api.fn_add_transporter_vehicle(json) TO dentall_rmm2_user;

