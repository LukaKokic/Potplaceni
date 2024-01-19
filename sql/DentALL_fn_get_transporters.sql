CREATE FUNCTION public.fn_get_transporters()
    RETURNS json
    LANGUAGE 'plpgsql'
    
AS $BODY$
declare
	returnValue json;
	
begin
	select into 
	returnValue json_agg(
		json_build_object(
			'transporterID', transporterid,
			'name', oraganisationname
		)
	)
	from
		public.transporter;
	return returnValue;
end;
$BODY$;
ALTER FUNCTION public.fn_get_transporters()
    OWNER TO dentall_rmm2_user;