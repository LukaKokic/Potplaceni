CREATE OR REPLACE FUNCTION api.fn_update_accommodation_avaliability(IN acc_update json)
    RETURNS json
    LANGUAGE 'plpgsql'
    
AS $BODY$
declare
	returnValue json;
	av bit := (acc_update->>'avaliable')::bit;
begin
	update 
		public.accommodation
	set
		active = av
	where
		accommodationid = (acc_update->>'id')::integer;
	
	returnValue := json_build_object(
		'success', true,
		'msg', 'Updated accommodation avaliability'
	);
	
	return returnValue;
	
end;
$BODY$;

ALTER FUNCTION api.fn_update_accommodation_avaliability(json)
    OWNER TO dentall_rmm2_user;