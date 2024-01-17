-- FUNCTION: public.fn_create_patient_transportation_plan(integer)

-- DROP FUNCTION IF EXISTS public.fn_create_patient_transportation_plan(integer);

CREATE OR REPLACE FUNCTION public.fn_create_patient_transportation_plan(
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
--dolazak
	with
		cte_assigned as (
			select
				pp.*,
				a.dot datefrom,
				a.dot dateto,
				c.townid
			from
				patientplan pp
			join
				assigned a
			on pp.patientid = a.patientid
			and	pp.treatmentid = a.treatmentid
			join
				clinic c
			on	pp.clinicid = c.clinicid
			
			where
				pp.patientid = patient_id
		)
		, cte_schedule as (
			select
				patientid,
				extract(dow from dan) dow,
				dan
			from (
				select 
					patientid,
					generate_series(datefrom, dateto, '1 DAY'::interval) dan
				from
					cte_assigned
			) s
		)

	INSERT INTO public.vehicleoccupied(
		patientid, vehicleid, timestart, timeend)
	select distinct on (ctass.patientid, ctsch.dan)
		ctass.patientid,
		v.vehicleid, 
		ctsch.dan + '07:00:00'::interval,
		ctsch.dan + '07:30:00'::interval
	from
		cte_assigned ctass
	inner join
		transporter tr
	on	ctass.townid = tr.townid
	inner join
		vehicle v
	on v.transporterid = tr.transporterid
	inner join
		cte_schedule ctsch
	on	ctass.patientid = ctsch.patientid
	inner join
		vehicleschedule vsch
	on	v.vehicleid = vsch.vehicleid
	and	vsch.dow = ctsch.dow
	and	'07:30:00'::time between vsch.timestart and vsch.timeend
	left join
		vehicleoccupied vocc
	on	v.vehicleid = vocc.vehicleid
	and	tstzrange(ctsch.dan + '07:00:00'::interval, ctsch.dan + '07:30:00'::interval) && tstzrange(vocc.timestart, vocc.timeend)
	where v.active = 1::bit
	and	vocc.vehicleid is null;
-- odlazak
with
		cte_assigned as (
			select
				pp.*,
				a.dot datefrom,
				a.dot dateto,
				c.townid
			from
				patientplan pp
			join
				assigned a
			on pp.patientid = a.patientid
			and	pp.treatmentid = a.treatmentid
			join
				clinic c
			on	pp.clinicid = c.clinicid
			
			where
				pp.patientid = patient_id
		)
		, cte_schedule as (
			select
				patientid,
				extract(dow from dan) dow,
				dan
			from (
				select 
					patientid,
					generate_series(datefrom, dateto, '1 DAY'::interval) dan
				from
					cte_assigned
			) s
		)

	INSERT INTO public.vehicleoccupied(
		patientid, vehicleid, timestart, timeend)
	select distinct on (ctass.patientid, ctsch.dan)
		ctass.patientid,
		v.vehicleid, 
		ctsch.dan + '16:00:00'::interval,
		ctsch.dan + '16:30:00'::interval
	from
		cte_assigned ctass
	inner join
		transporter tr
	on	ctass.townid = tr.townid
	inner join
		vehicle v
	on v.transporterid = tr.transporterid
	inner join
		cte_schedule ctsch
	on	ctass.patientid = ctsch.patientid
	inner join
		vehicleschedule vsch
	on	v.vehicleid = vsch.vehicleid
	and	vsch.dow = ctsch.dow
	and	'16:00:00'::time between vsch.timestart and vsch.timeend
	left join
		vehicleoccupied vocc
	on	v.vehicleid = vocc.vehicleid
	and	tstzrange(ctsch.dan + '16:00:00'::interval, ctsch.dan + '16:30:00'::interval) && tstzrange(vocc.timestart, vocc.timeend)
	where v.active = 1::bit
	and	vocc.vehicleid is null;
	
		
	get diagnostics rows_inserted = row_count;
	if (rows_inserted = 0) then
		returnValue := '{"msg": "No transportation found, walk!"}'::json;
		return returnValue;
	end if;
	
	returnValue := '{"msg": "Added to table vehicleoccupied"}'::json;
	return returnValue;
end
$BODY$;

ALTER FUNCTION public.fn_create_patient_transportation_plan(integer)
    OWNER TO dentall_rmm2_user;
