CREATE OR REPLACE FUNCTION api.fn_add_accommodation(IN accommodation_data json)
    RETURNS json
    LANGUAGE 'plpgsql'
    
AS $BODY$
declare
	returnValue json := '{"success": false, "msg": "Accommodation already exists"}';
	acc_REID varchar := (accommodation_data->>'realEstateID')::varchar;
	type_ID smallint := (accommodation_data->>'typeID')::smallint;
	equipped_ID smallint := (accommodation_data->>'equippedID')::smallint;
	lat decimal(9,6) := (accommodation_data->>'latitude')::decimal(9,6);
	long decimal(9,6) := (accommodation_data->>'longitude')::decimal(9,6);
	addr varchar := (accommodation_data->>'address')::varchar;
	town_ID integer := (accommodation_data->>'townID')::integer;
	clinic_ID integer := (accommodation_data->>'clinicID')::integer;
	ac bit := (accommodation_data->>'active')::bit;
	
begin
	if (select count (*) from public.accommodation where realestateid = acc_REID) = 0 then
		insert into public.accommodation (realestateid, typeid, equippedid, latitude, longitude, address, townid, clinicid, active)
		values (acc_REID, type_ID, equipped_ID, lat, long, addr, town_ID, clinic_ID, ac);
		
		returnValue := json_build_object(
			'success', true,
			'msg', 'Accommodation created'
		);
	end if;
	
	return returnValue;
end;
$BODY$;

ALTER FUNCTION api.fn_add_accommodation(json)
    OWNER TO dentall_rmm2_user;