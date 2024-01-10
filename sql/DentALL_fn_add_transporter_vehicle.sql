CREATE OR REPLACE FUNCTION api.fn_add_transporter_vehicle(IN new_vehicle_data json)
    RETURNS json
    LANGUAGE 'plpgsql'
    
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
	
begin
	if (select count(*) from public.vehicle where registration = reg) = 0 then
		INSERT INTO public.vehicle (registration, capacity, typeid, brand, model, transporterid, active)
		VALUES (reg, cap, type_id, vehicle_brand, brand_model, trans_id, acc);
		
		returnValue := json_build_object(
			'success', true,
			'msg', 'Vehicle added'
		);
		
		perform public.fn_create_schedule();
	end if;
	
	return returnValue;
end
$BODY$;

ALTER FUNCTION api.fn_add_transporter_vehicle(json)
    OWNER TO dentall_rmm2_user;