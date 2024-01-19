CREATE OR REPLACE FUNCTION public.fn_get_towns()
    RETURNS json
    LANGUAGE 'plpgsql'
    
AS $BODY$
declare
	returnValue json;
	
begin
	select into 
	returnValue json_agg(
		json_build_object(
			'id', townid,
			'townName', townname
		)
	)
	from
		public.town;
	return returnValue;
end;
	
$BODY$;

ALTER FUNCTION public.fn_get_towns()
    OWNER TO dentall_rmm2_user;