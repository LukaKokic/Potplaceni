CREATE OR REPLACE FUNCTION api.fn_view_accommodations()
    RETURNS json
    LANGUAGE 'plpgsql'
    
AS $BODY$
declare
	returnValue json;
	
begin
	with
		cte as(
			select
				acc.accommodationid acc_id,
				acc.realestateid realestate_id,
				acctype.description acc_type,
				eq.description equipped_type,
				acc.address || ', ' || t.postalcode || ', ' || t.townname acc_address,
				acc.active acc_active
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
			on	acc.townid = t.townid
			order by
				acc.accommodationid
		)
	select into 
	returnValue json_agg(
		json_build_object(
			'id', cte.acc_id,
			're_id', cte.realestate_id,
			'acc_type', cte.acc_type,
			'acc_eq', cte.equipped_type,
			'address', cte.acc_address,
			'active', cte.acc_active
		)
	)
	from
		cte;
		
	return returnValue;
end;
$BODY$;

ALTER FUNCTION api.fn_view_accommodations()
    OWNER TO dentall_rmm2_user;