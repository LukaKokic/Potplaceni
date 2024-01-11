-- FUNCTION: public.fn_create_schedule()

-- DROP FUNCTION IF EXISTS public.fn_create_schedule();

CREATE OR REPLACE FUNCTION public.fn_create_schedule(p_vid integer
	)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
declare
	dow integer;
	time_start time;
	time_end time;
	shift_break time;
	working_days integer[];
	i integer;
	
begin
	select 
		array_agg(dayOfWeek order by random())
	into
		working_days
	from (
    	select 
			dayOfWeek
    	from 
			generate_series(0, 6) AS dayOfWeek
    	order by 
			random()
    	LIMIT 5
	) AS subquery;
	
	FOR i IN 1..array_length(working_days, 1) LOOP
		dow := working_days[i];
		time_start = '00:00'::interval;
		time_end = '00:00'::interval;
		shift_break = '00:00'::interval;
		for j IN 1..2 LOOP
			if j = 1 then
				time_start := (RANDOM()*(10-6) + 6)::integer * '1 HOUR'::interval;
				time_end := time_start + '06:00'::interval;
				shift_break := time_end + '01:00'::interval;
			end if;
			if j != 1 then
				time_start := shift_break;
				time_end := time_start + '06:00'::interval;
				shift_break := time_end + '01:00'::interval;
			end if;
			INSERT INTO vehicleschedule(vehicleid, dow, timestart, timeend)
			VALUES (p_vid, dow, time_start::time, time_end::time);
		END LOOP;
	END LOOP;
end
	
$BODY$;

ALTER FUNCTION public.fn_create_schedule(integer)
    OWNER TO dentall_rmm2_user;
