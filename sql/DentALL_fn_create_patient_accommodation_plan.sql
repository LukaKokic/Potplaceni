-- FUNCTION: public.fn_create_patient_accommodation_plan(integer)

-- DROP FUNCTION IF EXISTS public.fn_create_patient_accommodation_plan(integer);

CREATE OR REPLACE FUNCTION public.fn_create_patient_accommodation_plan(
	patient_id integer)
    RETURNS json
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$

declare
	returnValue json;	
	rows_inserted integer;
	
begin
	INSERT INTO public.accommodationoccupied(
		patientid, accommodationid, datefrom, dateto)
	select
		pp.patientid,
		acc.accommodationid,
		a.dot - '1 DAY'::interval,
		a.dot + '2 DAY'::interval
	from
		patientplan pp
	join
		assigned a
	on pp.patientid = a.patientid
	and	pp.treatmentid = a.treatmentid
	join
		patientpreferences ppref
	on	pp.patientid = ppref.patientid
	inner join
		accommodation acc
	on	acc.typeid = ppref.typeid
	and	acc.equippedid = ppref.equippedid
	and acc.clinicid = pp.clinicid
	left join
		accommodationoccupied accocu
	on	accocu.accommodationid = acc.accommodationid
	and	daterange((a.dot - '1 DAY'::interval)::date, (a.dot + '2 DAY'::interval)::date) && daterange(accocu.datefrom, accocu.dateto)
	where pp.patientid = patient_id
	and	accocu.accommodationid is null
	limit 1;
		
	get diagnostics rows_inserted = row_count;
	if (rows_inserted = 0) then
		returnValue := '{"msg": "No accommodation found, plan canceled"}'::json;
		return returnValue;
	end if;
	
	returnValue := '{"msg": "Added to accommodationoccupied"}'::json;
	return returnValue;
end
$BODY$;

ALTER FUNCTION public.fn_create_patient_accommodation_plan(integer)
    OWNER TO dentall_rmm2_user;
