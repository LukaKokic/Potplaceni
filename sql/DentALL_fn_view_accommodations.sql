CREATE OR REPLACE FUNCTION api.fn_view_accommodations()
    RETURNS json
    LANGUAGE 'plpgsql'
    
AS $BODY$
declare
	returnValue json;
	
begin
	select into 
	returnValue json_agg(
		json_build_object(
			'id', acc.accommodationid,
			're_id', acc.realestateid,
			'acc_type', acctype.description,
			'acc_eq', eq.description,
			'address', acc.address || ', ' || t.postalcode || ', ' || t.townname
		)
	)
	from
		accommodation acc
	join 
		accommodationtype acctype
	on	acc.typeid = acctype.typeid
	join
		equipped eq
	on	eq.equippedid = acc.equippedid
	join
		town t
	on	acc.townid = t.townid;
	
	return returnValue;
end;
	
$BODY$;

ALTER FUNCTION api.fn_view_accommodations()
    OWNER TO dentall_rmm2_user;