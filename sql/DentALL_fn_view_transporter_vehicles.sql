-- FUNCTION: api.fn_view_transporter_vehicles(json)

-- DROP FUNCTION IF EXISTS api.fn_view_transporter_vehicles(json);

CREATE OR REPLACE FUNCTION api.fn_view_transporter_vehicles(
	transporter_in json)
    RETURNS json
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
declare
	returnValue json;
	transporter_id integer := (transporter_in->>'transporterID')::integer;
begin

select into
	returnValue json_agg(
		json_build_object(
			'vehicleID', v.vehicleid,
			'registration', v.registration,
			'brand', v.brand,
			'model', v.model,
			'capacity', v.capacity,
			'type', vt.description,
			'active', v.active
		)
	)
from
	public.vehicle v
join
	public.vehicletype vt
on	v.typeid = vt.typeid
where
	transporterid = transporter_id;
return returnValue;

end;
$BODY$;

ALTER FUNCTION api.fn_view_transporter_vehicles(json)
    OWNER TO dentall_rmm2_user;

GRANT EXECUTE ON FUNCTION api.fn_view_transporter_vehicles(json) TO PUBLIC;

GRANT EXECUTE ON FUNCTION api.fn_view_transporter_vehicles(json) TO app_api;

GRANT EXECUTE ON FUNCTION api.fn_view_transporter_vehicles(json) TO auth_api;

GRANT EXECUTE ON FUNCTION api.fn_view_transporter_vehicles(json) TO dentall_rmm2_user;

