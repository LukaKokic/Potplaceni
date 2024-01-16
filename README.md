# Funkcije na raspolaganju za FRONT forme
  GET funkcija **../get_accommodation_equipped_info** se može pozvati prilikom kreiranja forme za dodavanje smještaja ili setiranje preferencije pacijenta. U bazi se poziva funkcija **fn_get_equipped**, a vraća se JSON:
  
    [
      {
        "id": ,
        "type": ""
      },
      { 
        ...
      },
    ]

  GET funkcija **../get_accommodation_type_info** se može pozvati prilikom kreiranja forme za dodavanje smještaja ili setiranje preferencije pacijenta. U bazi se poziva funkcija **fn_get_accommodation_types**, a vraća se JSON:

    [
      {
        "id": ,
        "type": 
      },
      {
        ...
      },
    ]

  GET funkcija **../get_roles_info** se može pozvati prilikom kreiranja forme za dodavanje novod administratora, tj. prilikom odabira uloge novog adminstratora. U bazi se poziva funkcija **fn_get_roles**, a vraća se JSON:

    [
      {
        "id": ,
        "rName": 
      },
      {
        ...
      },
    ]


  GET funkcija **../get_towns_info** se može pozvati prilikom kreiranja forme za dodavanje novog smještaja. U bazi se poziva funkcija **fn_get_towns**, a vraća se JSON:
  
    [
      {
        "id": ,
        "townName": 
      },
      {
        ...
      },
    ]

  GET funkcija **../get_treatments_info** se može pozvati prilikom kreiranja forme za dodavanje pacijenta, tj. prilikom odabira tretmana. U bazi se poziva funkcija **fn_get_treatments**, a vraća se JSON:

    [
      {
        "id": ,
        "name": ,
        "desc": 
      },
      {
        ...
      },
    ]

  GET funkcija **../get_vehicle_type_info** se može pozvati prilikom kreiranja forme za dodavanje vozila prijevoznika. U bazi se poziva funkcija **fn_get_vehicle_types**, a vraća se JSON:

    [
      {
        "typeID": ,
        "desc": 
      },
      {
        ...
      },
    ]
  ps. brand i model vozila se proizovljno upisuju, među inicijalnim podacima su unešeni brandovi kao što su Dacia, BMW, Mercedes, Volkswagen, Skoda i neki modeli tih brandova, ali to kao podaci u bazi ne postoji u zasebnom entitetu

  GET funkcija **../get_clinics_info** se može pozvati prilikom kreiranja forme za dodavanje pacijenta, tj. prilikom odabira klinike u kojoj će se provoditi njegov tretman. U bazi se poziva funkcija **fn_get_clinics**, a vraća se JSON:

    [
      {
        "id": ,
        "name": 
      },
      {
        ...
      },
    ]

  GET funkcija **../get_last_used_realestate_id** se može pozvati prilikom kreiranja forme za dodavanje smještaja, tj. to polje u formi može biti non-editable ili uopće ne mora biti prikazano te se mora slati za svaki novi smještaj, ali inkrementirano (Npr. u bazi posotji 5 smještaja te zadnji realestateid je "IS-00005" te će ova funkcija vratiti taj id, ali kada bi se išao unijeti novi smještaj potrebno je dohvatiti zadnji realestateid i inkrementirati na "IS-00006"). U bazi se poziva funkcija **fn_get_last_realestate_id**, a vraća se JSON:
  
    [
      {
        "id":
      }
    ]
    
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
      "email": "",
      "roleList": []
    }
  u roleList se unose ID-evi uloga . U dropdown listi se mogu staviti imena uloge, a kao value asociran sa imenom uloge je roleid.
  
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

  ps. Prilikom ažuriranja podataka administratora, trebali bi se stari podaci zadržate te ukoliko ne dođe do ažuriranja određenih podataka da se i oni šalju u JSON-u. Drugim rječima, ako je odabrana opcija ažurianja podataka za administratora "Pero Perić PIN: 34798642 sa brojem mobitela +3859264783 i mail adresom pp@gmail.com i ulogom Administrator prijevoza te se ažurira samo njegov mail na pero.peric@gmail.com, a ostali podaci ostaju isti. U tom slučaju se u gornjem JSON-u **moraju** slati i stari podaci kao što je stari broj mobitela i stara uloga."
  
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
      "townID": ,
      "clinicID": ,
      "active": 
    }
  active bi trebao biti ili 0 ili 1.
  
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
      "email": "",
      "townID": "",
      "active": 
    }
  active bi trebao biti ili 0 ili 1.
  
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
  active bi trebao biti ili 0 ili 1.
  
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
  - popunjavanje entiteta assigned (entitet koji povezuje tretman i pacijenta), PatientPlan, PatientPreferences

  API:
    - definirati POST rutu za dodavanje novog pacijenta, **../add_patient**
  <br/>

  Oblik očekivanog JSON-a:
  
    {
      "pin": ,
      "firstname": "",
      "lastname": "",
      "phone": "",
      "mail": "",
      "homeAddress": "",
      "typePref": ,
      "equippedPref": ,
      "treatmentID": ,
      "from": "YYYY-MM-DD",
      "till": "YYYY-MM-DD",
      "clinicID": 
    }
  
  COMPLETED ✔
    
  ### UC18 - Pregled pacijenta
  BAZA:
  - napraviti funkciju za pregeledavanje podataka o svim pacijentima registriranim u sustavu, **fn_view_patients**

  API:
  - definirati GET rutu za pregledavanje svih pacijenata, **../view_patients**
  <br/>
  COMPLETED ✔
    
  ### UC19 - Dohvaćanje informacija o tretmanu
  BAZA:
  - napraviti funkciju u bazi za dohvaćanje detalja o tretmanu pacijenta, **fn_view_patient_treatment**
    - u kojoj se klinici liječi, protiv čega se liječi i u kojem razdoblju

  API:
  - definirati GET rutu za pregled tretmana pacijenta, **../view_patient_treatemnt/:patientID**
  <br/>
  COMPLETED ✔
    
  ### UC20 - Brisanje pacijenta
  BAZA:
  - napraviti funkciju u bazi koja kaskadno briše sve entitete povezane sa obrisanim pacijentom, **fn_delete_patient**

  API:
  - definirati DELETE rutu za brisanje pacijenta, **../delete_patient**
  <br/>
  
  Oblik očekivanog JSON-a:
  
    {
      "id": 
    }
 
  COMPLETED ✔
    
  ### UC21 - Periodičko pridijeljivanje smještaja i prijevoza pacijentima
  BAZA:
  - funkcija u bazi kojom će se popunjavati entiteti AccommodationOccupied i VehicleOccupied prema preferencama pacijenata, ukoliko je to moguće
    - logika liječenja pacijenta, zauzimanje slobodnog smještaja, angažiranje prijevoza od i do smještaja te klinike
    - napravljene funkcije **fn_create_patietn_accommodation_plan** za popunjavanje entiteta AccommodationOccupied i **fn_create_patietn_transportation_plan** za popunjavanje entiteta VehicleOccupied
  <br/>
  COMPLETED ✔
    
  ### UC22 - Obavještavanje klijenata o uspješnom zaključenju plana
  BAZA:
  - prilikom dodavanja pacijenta izrađuje se plan njihovog smještaja i transporta

  API:
  - definirane su funkcije **notifyPatient** i **notifyTransporter** koje obavještavaju pacijenta i prijevoznika o planu i programu tretmana odnosno prijevoza.
  
  <br/>
  COMPLETED ✔
<br/>
