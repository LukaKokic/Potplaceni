# Dnevnik implementacije
  ### Inicijalno postavljanje baze
  - popunjavanje baze sa podacima za entitete:
    Town ✔,
    Clinic ✔,
    VehicleType ✔,
    AccommodationType ✔,
    Equipped ✔,
    Treatment ✔
  <br/>
  COMPLETED ✔

  ### UC2 - Dodavanje novog korisnika
  BAZA:
  - napraviti funkciju u bazi za dodavanje novog administratora, **fn_add_admin**
    -provjera postoji li već takav administrator u bazi
  - automatska izrada vjerodajnica za novododanog administratora, **fn_create_credentials**
  - popunjavanje tablice assignedrole sa dodijeljenom/dodjeljenim ulogama novom administratoru

  API:
  - definirati POST rutu za dodavanje novog administratora, **../add_admin**

  Oblik očekivanog JSON-a:
  
    {
      "PIN": "",
      "firstname": "",
      "lastname": "",
      "phone": "",
      "email": ""
    }
    
  <br/>
  COMPLETED ✔

  ### UC3 - Pregled korisnika
  BAZA:
  - napraviti funkciju za pregeledavanje podataka o svim administratorima registriranim u sustavu, **fn_view_admins**
    - pregled uloga svakog korisnika?

  API:
  - definirati GET rutu za pregledavanje svih administratora, **../view_admins**
  <br/>
  COMPLETED ✔

  ### UC4 - Modificiranje podataka korisnika
  BAZA:
  - napraviti funkciju u bazi za promjenu podataka postojećeg administratora, **fn_update_admin_account** (phone number, e-mail, role)
  - napraviti funkciju u bazi za promjenu zaporke za prijavljivanje u sustav, **fn_change_password**

  API:
  - definirati POST rutu za ažuriranje osobnih podataka o administratoru te njegove uloge, **../update_admin_info**
  - definirati POST rutu za promjenu zaporke za prijavljivanje u sustav, **../change_password**
  <br/>
  
  Oblik očekivanog JSON-a za **../update_admin_info**:
  
    {
      "userID": "",
      "phone": "",
      "email": "",
      "roleList": []
    }
    
  Oblik očekivanog JSON-a za **../change_password**:
  
    {
      "userID": "",
      "pass": ""
    }
    
  COMPLETED ✔

  ### UC5 - Brisanje postojećeg korisnika
  BAZA:
  - napraviti funkciju u bazi koja kaskadno briše sve entitete povezane sa obrisanim korisnikom, **fn_delete_admin**
    - također se brišu vjerodajnice u tablici credentials te n-torke u tablici assignedrole

  API:
  - definirati POST rutu za brisanje administratora, **../delete_admin**

  Oblik očekivanog JSON-a:
  
    {
      "userID": ""
    }
    
  <br/>
  COMPLETED ✔

  ### UC6 - Dodavanje novog smještaja
  BAZA:
  - napraviti funkciju u bazi za dodavanje novog smještaja, **fn_add_accommodation**
    - provjera postoji li dodani smještaj u bazi
    - popunjavanje relacije clinciAccommodation sa vezom novododanog smještaja i klinike

  API:
  - definirati POST rutu za dodavanje novog smještaja, **../add_accommodation**

  IDEJA ZA FRONT:
  - prilikom izrade forme za popunjavanje informacija o novom smješaju, treba dohvatiti iz baze polja kao što su Town, AccommodationType, Equipped, zato što se sa fronta šalje podaci o ID-u grada, accommodationtype-a i equipped. Stoga su napravljene funkcije u bazi za dohvat svih tih informacija, pa prilikom dolaska na stranicu forme trebalo bi povući te podatke i onda npr. kada se odabire grad ponuiditi dropdown listu s dohvaćenim podacima iz baze
  <br/>
  
  Oblik očekivanog JSON-a:

    {
      "realEstateID": "",
      "typeID": ,
      "equippedID": ,
      "latitude": "",
      "longitude": "",
      "address": "",
      "townID": "",
      "active": ,
    }
    
  COMPLETED ✔

  ### UC7 - Pregled smještaja
  BAZA:
  - napraviti funkciju za pregeledavanje podataka o svim smještajima registriranim u sustavu, **fn_view_accommodations**

  API:
  - definirati GET rutu za pregledavanje svih smještaja, **../view_accommodations**
  <br/>
  COMPLETED ✔

  ### UC8 - Postavljanje raslopoživosti smještaja
  BAZA:
  - napraviti funkciju za ažuriranje raspoloživosti smještaja u sustavu, **fn_update_accommodation_avaliability**

  API:
  - definirati PUT rutu za ažuriranje raspoloživosti smještaja, **../update_accommodation_avaliability**
  <br/>

  Oblik očekivanog JSON-a:
  
    {
      "id": ,
      "avaliable": 
    }
    
  COMPLETED ✔

  ### UC9 - Brisanje postojećeg smještaja
  BAZA:
  - napraviti funkciju u bazi koja kaskadno briše sve entitete povezane sa obrisanim smještajem, **fn_delete_accommodation**

  API:
  - definirati DELETE rutu za brisanje smještaja, **../delete_accommodation**
  <br/>

  Oblik očekivanog JSON-a:
  
    {
      "id": 
    }
    
  COMPLETED ✔
    
  ### UC10 - Dodavanje prijevoznika
  BAZA:
  - napraviti funkciju u bazi za dodavanje novog prijevoznika, **fn_add_transporter**
    - provjera postoji li dodani prijevoznik u bazi
    - popunjavanje relacije clinicTransporter  sa vezom novododanog prijevoznika i klinike

  API:
  - definirati POST rutu za dodavanje novog prijevoznika, **../add_transporter**
  <br/>
  
  Oblik očekivanog JSON-a:
  
    {
      "orgName": "",
      "contact": "",
      "address": "",
      "townID": "",
      "active": 
    }
    
  COMPLETED ✔
    
  ### UC11 - Pregled prijevoznika
  BAZA:
  - napraviti funkciju za pregeledavanje podataka o svim prijevoznicima registriranim u sustavu, **fn_view_transporters**

  API:
  - definirati GET rutu za pregledavanje svih prijevoznika, **../view_transporters**
  <br/>
  COMPLETED ✔
    
  ### UC12 - Brisanje prijevoznika
  BAZA:
  - napraviti funkciju u bazi koja kaskadno briše sve entitete povezane sa obrisanim prijevoznikom, **fn_delete_transporter**

  API:
  - definirati DELETE rutu za brisanje prijhevoznika, **../delete_transporter**
  <br/>
  
  Oblik očekivanog JSON-a:
  
    {
      "id": 
    }
    
  COMPLETED ✔
    
  ### UC13 - Dodavanje vozila prijevoznika
  BAZA:
  - napraviti funkciju u bazi za dodavanje vozila prijevozniku, **fn_add_transporter_vehicle**
    - također se popunjava entitet Vehicle

  API:
  - definirati POST rutu za dodavanje vozila prijevozniku, **../add_transporter_vehicle**
  <br/>

  Oblik očekivanog JSON-a:

    {
      "registration": "",
      "capacity": "",
      "type": "",
      "brand": "",
      "model": "",
      "transporter_id": "",
      "active": 
    }
    
  COMPLETED ✔
    
  ### UC14 - Pregled vozila prijevoznika
  BAZA:
  - napraviti funkcij u bazi za pregled postojećih vozila prijevoznika u sustavu, **fn_view_transporter_vehicles**

  API:
  - definirati GET rutu za prikazivanje vozila prijevoznika, **../view_vehicles/:transporterID**
  <br/>
  COMPLETED ✔
    
  ### UC15 - Postavljanje raspoloživosti vozila prijevoznika
  BAZA:
  - napraviti funkciju za ažuriranje raspoloživosti vozila prijevoznika u sustavu, **fn_update_vehicle_avaliability**

  API:
  - definirati PUT rutu za ažuriranje raspoloživosti vozila prijevoznika, **../update_vehicle_avaliability**
  <br/>

  Oblik očekivanog JSON-a:

    {
      "id": ,
      "avaliable": 
    }
    
  COMPLETED ✔
    
  ### UC16 - Brisanje vozila prijevoznika
  BAZA:
  - napraviti funkciju u bazi koja kaskadno briše sve entitete povezane sa obrisanim vozilom prijevotnika, **fn_delete_transporter_vehicle**

  API:
  - definirati DELETE rutu za brisanje vozila prijevoznika, **../delete_transporter_vehicle**
  <br/>

  Oblik očekivanog JSON-a:
  
    {
      "id": 
    }
    
  COMPLETED ✔
    
  ### UC17 - Dodavanje pacijenta
  BAZA:
  - napraviti funkciju u bazi za dodavanje novog pacijenta, **fn_add_patient**
    -provjera postoji li već takav pacijent u bazi
    - popunjavanje podataka o tretmanu
    - popunjavanje podataka o preferencijama smještaja pacijenta
  - popunjavanje entiteta assigned (entitet koji povezuje tretman i pacijenta), PatietnArrival, PatientPlan

  API:
    - definirati POST rutu za dodavanje novog pacijenta, **../add_patient/**
  <br/>
    COMPLETED ❌
    
  ### UC18 - Pregled pacijenta
  BAZA:
  - napraviti funkciju za pregeledavanje podataka o svim pacijentima registriranim u sustavu, **fn_view_patients**

  API:
  - definirati GET rutu za pregledavanje svih pacijenata, **../view_patients/**
  <br/>
  COMPLETED ❌
    
  ### UC19 - Dohvaćanje informacija o tretmanu
  BAZA:
  - napraviti funkciju u bazi za dohvaćanje detalja o tretmanu pacijenta, **fn_get_patient_treatment**
    - u kojoj se klinici liječi, protiv ćega se liječi i u kojem razdoblju

  API:
  - definirati GET rutu za pregled tretmana pacijenta, **../view_patient_treatemnt/<int:patientID>**
  <br/>
  COMPLETED ❌
    
  ### UC20 - Brisanje pacijenta
  BAZA:
  - napraviti funkciju u bazi koja kaskadno briše sve entitete povezane sa obrisanim pacijentom, **fn_delete_patient**

  API:
  - definirati DELETE rutu za brisanje pacijenta, **../delete_patient/<int:patientID>**
  <br/>
  COMPLETED ❌
    
  ### UC21 - Periodičko pridijeljivanje smještaja i prijevoza pacijentima
  BAZA:
  - funkcija u bazi kojom će se popunjavati entiteti AccommodationOccupied i VehicleOccupied prema preferencama pacijenata, ukoliko je to moguće, **fn_create_treatmenet_plan**
    - logika liječenja pacijenta, zauzimanje slobodnog smještaja, angažiranje prijevoza od i do smještaja te klinike
  <br/>
  COMPLETED ❌
    
  ### UC22 - Obavještavanje klijenata o uspješnom zaključenju plana
  BAZA:
  - slanje elektroničke pošte svim strankama uključenim za kreirani plan tretmana, **fn_finalize_plan**
    - obavještavanje pacijenta gdje je i u kojem razdoblju dobio smještaj
    - obavještavanje prijevoznika kada i gdje treba pokupiti pacijenta te kuda ga treba odvesti
  <br/>
  COMPLETED ❌
<br/>
