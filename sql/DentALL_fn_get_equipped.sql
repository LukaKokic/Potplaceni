CREATE OR REPLACE FUNCTION public.fn_get_equipped()
    RETURNS json
    LANGUAGE 'plpgsql'
    
AS $BODY$
declare
	returnValue json;
	
begin
	select into 
	returnValue json_agg(
		json_build_object(
			'id', equippedid,
			'type', description
		)
	)
	from
		public.equipped;
	return returnValue;
end;
$BODY$;

ALTER FUNCTION public.fn_get_equipped()
    OWNER TO dentall_rmm2_user;