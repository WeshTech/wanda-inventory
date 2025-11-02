export interface Ward {
  id: string;
  name: string;
}

export interface Constituency {
  id: string;
  name: string;
  wards: Ward[];
}

export interface County {
  id: string;
  name: string;
  constituencies: Constituency[];
}

export interface AreaDataType {
  counties: County[];
}
export const AreaData = {
  counties: [
    {
      id: "nairobi",
      name: "Nairobi",
      constituencies: [
        {
          id: "westlands",
          name: "Westlands",
          wards: [
            { id: "kitisuru", name: "Kitisuru" },
            { id: "parklands_highridge", name: "Parklands/Highridge" },
            { id: "karura", name: "Karura" },
            { id: "kangemi", name: "Kangemi" },
            { id: "mountain_view", name: "Mountain View" },
          ],
        },
        {
          id: "dagoretti_north",
          name: "Dagoretti North",
          wards: [
            { id: "kilimani", name: "Kilimani" },
            { id: "kawangware", name: "Kawangware" },
            { id: "gatina", name: "Gatina" },
            { id: "kileleshwa", name: "Kileleshwa" },
            { id: "kabiro", name: "Kabiro" },
          ],
        },
        {
          id: "dagoretti_south",
          name: "Dagoretti South",
          wards: [
            { id: "mutuini", name: "Mutuini" },
            { id: "ngando", name: "Ng'ando" },
            { id: "riruta", name: "Riruta" },
            { id: "uthiru_ruthimitu", name: "Uthiru/Ruthimitu" },
            { id: "waithaka", name: "Waithaka" },
          ],
        },
        {
          id: "langata",
          name: "Lang'ata",
          wards: [
            { id: "karen", name: "Karen" },
            { id: "nairobi_west", name: "Nairobi West" },
            { id: "mugumoini", name: "Mugumo-ini" },
            { id: "south_c", name: "South C" },
            { id: "nyayo_highrise", name: "Nyayo Highrise" },
          ],
        },
        {
          id: "kibra",
          name: "Kibra",
          wards: [
            { id: "laini_saba", name: "Laini Saba" },
            { id: "lindi", name: "Lindi" },
            { id: "makina", name: "Makina" },
            {
              id: "woodley_kenyatta_golf",
              name: "Woodley/Kenyatta Golf Course",
            },
            { id: "sarangombe", name: "Sarang'ombe" },
          ],
        },
        {
          id: "roysambu",
          name: "Roysambu",
          wards: [
            { id: "githurai", name: "Githurai" },
            { id: "kahawa_west", name: "Kahawa West" },
            { id: "zimmerman", name: "Zimmerman" },
            { id: "roysambu", name: "Roysambu" },
            { id: "kahawa", name: "Kahawa" },
          ],
        },
        {
          id: "kasarani",
          name: "Kasarani",
          wards: [
            { id: "clay_city", name: "Clay City" },
            { id: "mwiki", name: "Mwiki" },
            { id: "kasarani", name: "Kasarani" },
            { id: "njiru", name: "Njiru" },
            { id: "ruai", name: "Ruai" },
          ],
        },
        {
          id: "ruaraka",
          name: "Ruaraka",
          wards: [
            { id: "baba_dogo", name: "Baba Dogo" },
            { id: "utalii", name: "Utalii" },
            { id: "mathare_north", name: "Mathare North" },
            { id: "lucky_summer", name: "Lucky Summer" },
            { id: "korogocho", name: "Korogocho" },
          ],
        },
        {
          id: "embakasi_south",
          name: "Embakasi South",
          wards: [
            { id: "imara_daima", name: "Imara Daima" },
            { id: "kwa_njenga", name: "Kwa Njenga" },
            { id: "kwa_reuben", name: "Kwa Reuben" },
            { id: "pipeline", name: "Pipeline" },
            { id: "kware", name: "Kware" },
          ],
        },
        {
          id: "embakasi_north",
          name: "Embakasi North",
          wards: [
            { id: "kariobangi_north", name: "Kariobangi North" },
            { id: "dandora_area_i", name: "Dandora Area I" },
            { id: "dandora_area_ii", name: "Dandora Area II" },
            { id: "dandora_area_iii", name: "Dandora Area III" },
            { id: "dandora_area_iv", name: "Dandora Area IV" },
          ],
        },
        {
          id: "embakasi_central",
          name: "Embakasi Central",
          wards: [
            { id: "kayole_north", name: "Kayole North" },
            { id: "kayole_central", name: "Kayole Central" },
            { id: "kayole_south", name: "Kayole South" },
            { id: "komarock", name: "Komarock" },
            { id: "matopeni_spring_valley", name: "Matopeni/Spring Valley" },
          ],
        },
        {
          id: "embakasi_east",
          name: "Embakasi East",
          wards: [
            { id: "upper_savannah", name: "Upper Savannah" },
            { id: "lower_savannah", name: "Lower Savannah" },
            { id: "embakasi", name: "Embakasi" },
            { id: "utawala", name: "Utawala" },
            { id: "mihang_o", name: "Mihang'o" },
          ],
        },
        {
          id: "embakasi_west",
          name: "Embakasi West",
          wards: [
            { id: "umoja_i", name: "Umoja I" },
            { id: "umoja_ii", name: "Umoja II" },
            { id: "mowlem", name: "Mowlem" },
            { id: "kariobangi_south", name: "Kariobangi South" },
          ],
        },
        {
          id: "makadara",
          name: "Makadara",
          wards: [
            { id: "maringo_hamza", name: "Maringo/Hamza" },
            { id: "viwandani", name: "Viwandani" },
            { id: "harambee", name: "Harambee" },
            { id: "makongeni", name: "Makongeni" },
          ],
        },
        {
          id: "kamukunji",
          name: "Kamukunji",
          wards: [
            { id: "pumwani", name: "Pumwani" },
            { id: "eastleigh_north", name: "Eastleigh North" },
            { id: "eastleigh_south", name: "Eastleigh South" },
            { id: "airbase", name: "Airbase" },
            { id: "california", name: "California" },
          ],
        },
        {
          id: "starehe",
          name: "Starehe",
          wards: [
            { id: "nairobi_central", name: "Nairobi Central" },
            { id: "ngara", name: "Ngara" },
            { id: "pangani", name: "Pangani" },
            { id: "ziwani_kariokor", name: "Ziwani/Kariokor" },
            { id: "landimawe", name: "Landimawe" },
            { id: "nairobi_south", name: "Nairobi South" },
          ],
        },
        {
          id: "mathare",
          name: "Mathare",
          wards: [
            { id: "hospital", name: "Hospital" },
            { id: "mabatini", name: "Mabatini" },
            { id: "huruma", name: "Huruma" },
            { id: "ngei", name: "Ngei" },
            { id: "mlango_kubwa", name: "Mlango Kubwa" },
            { id: "kiamaiko", name: "Kiamaiko" },
          ],
        },
      ],
    },
    {
      id: "mombasa",
      name: "Mombasa",
      constituencies: [
        {
          id: "changamwe",
          name: "Changamwe",
          wards: [
            { id: "port_reitz", name: "Port Reitz" },
            { id: "kipevu", name: "Kipevu" },
            { id: "airport", name: "Airport" },
            { id: "changamwe", name: "Changamwe" },
            { id: "chaani", name: "Chaani" },
          ],
        },
        {
          id: "jomvu",
          name: "Jomvu",
          wards: [
            { id: "jomvu_kuu", name: "Jomvu Kuu" },
            { id: "miritini", name: "Miritini" },
            { id: "mikindani", name: "Mikindani" },
          ],
        },
        {
          id: "kisauni",
          name: "Kisauni",
          wards: [
            { id: "mjambere", name: "Mjambere" },
            { id: "junda", name: "Junda" },
            { id: "bamburi", name: "Bamburi" },
            { id: "mwakirunge", name: "Mwakirunge" },
            { id: "mtopanga", name: "Mtopanga" },
            { id: "magogoni", name: "Magogoni" },
          ],
        },
        {
          id: "nyali",
          name: "Nyali",
          wards: [
            { id: "frere_town", name: "Frere Town" },
            { id: "ziwa_la_ngombe", name: "Ziwa La Ng'ombe" },
            { id: "mkomani", name: "Mkomani" },
            { id: "kongowea", name: "Kongowea" },
            { id: "kadzandani", name: "Kadzandani" },
          ],
        },
        {
          id: "likoni",
          name: "Likoni",
          wards: [
            { id: "mtongwe", name: "Mtongwe" },
            { id: "shika_adabu", name: "Shika Adabu" },
            { id: "bofu", name: "Bofu" },
            { id: "likoni", name: "Likoni" },
            { id: "timbwani", name: "Timbwani" },
          ],
        },
        {
          id: "mvita",
          name: "Mvita",
          wards: [
            { id: "mji_wa_kale", name: "Mji Wa Kale" },
            { id: "tudor", name: "Tudor" },
            { id: "tononoka", name: "Tononoka" },
            { id: "shimanzi", name: "Shimanzi" },
            { id: "majengo", name: "Majengo" },
          ],
        },
      ],
    },
    {
      id: "kisumu",
      name: "Kisumu",
      constituencies: [
        {
          id: "kisumu_central",
          name: "Kisumu Central",
          wards: [
            { id: "kajulu", name: "Kajulu" },
            { id: "kolwa_central", name: "Kolwa Central" },
            { id: "manyatta_b", name: "Manyatta 'B'" },
            { id: "nyalenda_a", name: "Nyalenda 'A'" },
            { id: "nyalenda_b", name: "Nyalenda 'B'" },
          ],
        },
        {
          id: "kisumu_east",
          name: "Kisumu East",
          wards: [
            { id: "kogony", name: "Kogony" },
            { id: "kosa_holo", name: "Kosa Holo" },
            { id: "east_kano", name: "East Kano" },
            { id: "west_kano", name: "West Kano" },
            { id: "kobura", name: "Kobura" },
          ],
        },
        {
          id: "kisumu_west",
          name: "Kisumu West",
          wards: [
            { id: "south_west_kisumu", name: "South West Kisumu" },
            { id: "central_kisumu", name: "Central Kisumu" },
            { id: "kisumu_north", name: "Kisumu North" },
            { id: "west_kisumu", name: "West Kisumu" },
            { id: "north_west_kisumu", name: "North West Kisumu" },
          ],
        },
        {
          id: "seme",
          name: "Seme",
          wards: [
            { id: "east_seme", name: "East Seme" },
            { id: "west_seme", name: "West Seme" },
            { id: "north_seme", name: "North Seme" },
            { id: "central_seme", name: "Central Seme" },
          ],
        },
        {
          id: "nyando",
          name: "Nyando",
          wards: [
            { id: "east_nyakach", name: "East Nyakach" },
            { id: "south_nyakach", name: "South Nyakach" },
            { id: "central_nyakach", name: "Central Nyakach" },
            { id: "west_nyakach", name: "West Nyakach" },
          ],
        },
        {
          id: "muhoroni",
          name: "Muhoroni",
          wards: [
            { id: "north_east_nyakach", name: "North East Nyakach" },
            { id: "south_west_nyakach", name: "South West Nyakach" },
            { id: "west_nyakach", name: "West Nyakach" },
          ],
        },
        {
          id: "nyakach",
          name: "Nyakach",
          wards: [
            { id: "pap_onditi", name: "Pap Onditi" },
            { id: "koduogo", name: "Koduogo" },
            { id: "south_west_nyakach", name: "South West Nyakach" },
            { id: "north_west_nyakach", name: "North West Nyakach" },
          ],
        },
      ],
    },
    {
      id: "nakuru",
      name: "Nakuru",
      constituencies: [
        {
          id: "nakuru_town_west",
          name: "Nakuru Town West",
          wards: [
            { id: "barut", name: "Barut" },
            { id: "london", name: "London" },
            { id: "kaptembwo", name: "Kaptembwo" },
            { id: "kapkures", name: "Kapkures" },
            { id: "rhoda", name: "Rhoda" },
            { id: "shaabab", name: "Shaabab" },
          ],
        },
        {
          id: "nakuru_town_east",
          name: "Nakuru Town East",
          wards: [
            { id: "biashara", name: "Biashara" },
            { id: "kivumbini", name: "Kivumbini" },
            { id: "flamingo", name: "Flamingo" },
            { id: "menengai", name: "Menengai" },
            { id: "nakuru_east", name: "Nakuru East" },
          ],
        },
        {
          id: "kuresoi_south",
          name: "Kuresoi South",
          wards: [
            { id: "keringet", name: "Keringet" },
            { id: "kisanana", name: "Kisanana" },
            { id: "tinet", name: "Tinet" },
            { id: "kamara", name: "Kamara" },
          ],
        },
        {
          id: "kuresoi_north",
          name: "Kuresoi North",
          wards: [
            { id: "amalo", name: "Amalo" },
            { id: "kapsimotwo", name: "Kapsimotwo" },
            { id: "sirikwa", name: "Sirikwa" },
            { id: "kiptororo", name: "Kiptororo" },
          ],
        },
        {
          id: "subukia",
          name: "Subukia",
          wards: [
            { id: "subukia", name: "Subukia" },
            { id: "waseges", name: "Waseges" },
            { id: "kabazi", name: "Kabazi" },
          ],
        },
        {
          id: "gilgil",
          name: "Gilgil",
          wards: [
            { id: "gilgil", name: "Gilgil" },
            { id: "elementaita", name: "Elementaita" },
            { id: "mbaruk_eburu", name: "Mbaruk/Eburu" },
            { id: "malewa_west", name: "Malewa West" },
            { id: "murindati", name: "Murindati" },
          ],
        },
        {
          id: "naivasha",
          name: "Naivasha",
          wards: [
            { id: "viwandani", name: "Viwandani" },
            { id: "lake_view", name: "Lake View" },
            { id: "mai_mahiu", name: "Mai Mahiu" },
            { id: "maella", name: "Maella" },
            { id: "biashara", name: "Biashara" },
            { id: "karai", name: "Karai" },
          ],
        },
        {
          id: "njoro",
          name: "Njoro",
          wards: [
            { id: "njoro", name: "Njoro" },
            { id: "mau_narok", name: "Mau Narok" },
            { id: "mauche", name: "Mauche" },
            { id: "kihingo", name: "Kihingo" },
            { id: "nessuit", name: "Nessuit" },
            { id: "lare", name: "Lare" },
          ],
        },
        {
          id: "molo",
          name: "Molo",
          wards: [
            { id: "mariashoni", name: "Mariashoni" },
            { id: "elburgon", name: "Elburgon" },
            { id: "turi", name: "Turi" },
            { id: "molo", name: "Molo" },
          ],
        },
        {
          id: "rongai",
          name: "Rongai",
          wards: [
            { id: "soin", name: "Soin" },
            { id: "visoi", name: "Visoi" },
            { id: "mosop", name: "Mosop" },
            { id: "solai", name: "Solai" },
          ],
        },
        {
          id: "bahati",
          name: "Bahati",
          wards: [
            { id: "dundori", name: "Dundori" },
            { id: "kabatini", name: "Kabatini" },
            { id: "kiamaina", name: "Kiamaina" },
            { id: "lanet_umoja", name: "Lanet/Umoja" },
            { id: "bahati", name: "Bahati" },
          ],
        },
      ],
    },
    {
      id: "baringo",
      name: "Baringo",
      constituencies: [
        {
          id: "baringo-central",
          name: "Baringo Central",
          wards: [
            {
              id: "kabarnet",
              name: "Kabarnet",
            },
            {
              id: "sacho",
              name: "Sacho",
            },
            {
              id: "tenges",
              name: "Tenges",
            },
            {
              id: "ewalel-chapchap",
              name: "Ewalel / Chapchap",
            },
            {
              id: "kapropita",
              name: "Kapropita",
            },
          ],
        },
        {
          id: "baringo-north",
          name: "Baringo North",
          wards: [
            {
              id: "barwessa",
              name: "Barwessa",
            },
            {
              id: "saimo-kipsaraman",
              name: "Saimo Kipsaraman",
            },
            {
              id: "saimo-soi",
              name: "Saimo Soi",
            },
            {
              id: "kabartonjo",
              name: "Kabartonjo",
            },
            {
              id: "bartabwa",
              name: "Bartabwa",
            },
          ],
        },
        {
          id: "baringo-south",
          name: "Baringo South",
          wards: [
            {
              id: "marigat",
              name: "Marigat",
            },
            {
              id: "ilchamus",
              name: "Ilchamus",
            },
            {
              id: "mochongoi",
              name: "Mochongoi",
            },
            {
              id: "mukutani",
              name: "Mukutani",
            },
          ],
        },
        {
          id: "mogotio",
          name: "Mogotio",
          wards: [
            {
              id: "mogotio-ward",
              name: "Mogotio",
            },
            {
              id: "emining",
              name: "Emining",
            },
            {
              id: "kisanana",
              name: "Kisanana",
            },
          ],
        },
        {
          id: "eldama-ravine",
          name: "Eldama Ravine",
          wards: [
            {
              id: "lembus",
              name: "Lembus",
            },
            {
              id: "ravine",
              name: "Ravine",
            },
            {
              id: "lembus-kwen",
              name: "Lembus Kwen",
            },
            {
              id: "koibatek",
              name: "Koibatek",
            },
            {
              id: "lembus-perkerra",
              name: "Lembus Perkerra",
            },
            {
              id: "mumberes-majimazuri",
              name: "Mumberes / Majimazuri",
            },
          ],
        },
        {
          id: "tiaty",
          name: "Tiaty",
          wards: [
            {
              id: "tirioko",
              name: "Tirioko",
            },
            {
              id: "kolowa",
              name: "Kolowa",
            },
            {
              id: "ribkwo",
              name: "Ribkwo",
            },
            {
              id: "silale",
              name: "Silale",
            },
            {
              id: "tangulbei-korossi",
              name: "Tangulbei / Korossi",
            },
            {
              id: "loiyamorock",
              name: "Loiyamorock",
            },
            {
              id: "churo-amaya",
              name: "Churo / Amaya",
            },
          ],
        },
      ],
    },
    {
      id: "bomet",
      name: "Bomet",
      constituencies: [
        {
          id: "bomet-central",
          name: "Bomet Central",
          wards: [
            {
              id: "silibwet-township",
              name: "Silibwet Township",
            },
            {
              id: "ndaraweta",
              name: "Ndaraweta",
            },
            {
              id: "singorwet",
              name: "Singorwet",
            },
            {
              id: "chesoen",
              name: "Chesoen",
            },
            {
              id: "mutarakwa",
              name: "Mutarakwa",
            },
          ],
        },
        {
          id: "bomet-east",
          name: "Bomet East",
          wards: [
            {
              id: "merigi",
              name: "Merigi",
            },
            {
              id: "kembu",
              name: "Kembu",
            },
            {
              id: "longisa",
              name: "Longisa",
            },
            {
              id: "kipreres",
              name: "Kipreres",
            },
            {
              id: "chemaner",
              name: "Chemaner",
            },
          ],
        },
        {
          id: "chepalungu",
          name: "Chepalungu",
          wards: [
            {
              id: "kong-asis",
              name: "Kong'asis",
            },
            {
              id: "nyangores",
              name: "Nyangores",
            },
            {
              id: "sigor",
              name: "Sigor",
            },
            {
              id: "chebunyo",
              name: "Chebunyo",
            },
            {
              id: "siongiroi",
              name: "Siongiroi",
            },
          ],
        },
        {
          id: "sotik",
          name: "Sotik",
          wards: [
            {
              id: "ndanai-abosi",
              name: "Ndanai/Abosi",
            },
            {
              id: "chemagel",
              name: "Chemagel",
            },
            {
              id: "kipsonoi",
              name: "Kipsonoi",
            },
            {
              id: "kapletundo",
              name: "Kapletundo",
            },
            {
              id: "rongena-manaret",
              name: "Rongena/Manaret",
            },
          ],
        },
        {
          id: "konoin",
          name: "Konoin",
          wards: [
            {
              id: "chepchabas",
              name: "Chepchabas",
            },
            {
              id: "kimulot",
              name: "Kimulot",
            },
            {
              id: "mogogosiek",
              name: "Mogogosiek",
            },
            {
              id: "boito",
              name: "Boito",
            },
            {
              id: "embomos",
              name: "Embomos",
            },
          ],
        },
      ],
    },

    {
      id: "bungoma",
      name: "Bungoma",
      constituencies: [
        {
          id: "mt-elgon",
          name: "Mt. Elgon",
          wards: [
            {
              id: "cheptais",
              name: "Cheptais",
            },
            {
              id: "chesikaki",
              name: "Chesikaki",
            },
            {
              id: "chepyuk",
              name: "Chepyuk",
            },
            {
              id: "kapkateny",
              name: "Kapkateny",
            },
            {
              id: "kaptama",
              name: "Kaptama",
            },
            {
              id: "elgon",
              name: "Elgon",
            },
          ],
        },
        {
          id: "sirisia",
          name: "Sirisia",
          wards: [
            {
              id: "namwela",
              name: "Namwela",
            },
            {
              id: "malakisi-south-kulisiru",
              name: "Malakisi/South Kulisiru",
            },
            {
              id: "lwandanyi",
              name: "Lwandanyi",
            },
          ],
        },
        {
          id: "kabuchai",
          name: "Kabuchai",
          wards: [
            {
              id: "kabuchai-chwele",
              name: "Kabuchai/Chwele",
            },
            {
              id: "west-nalondo",
              name: "West Nalondo",
            },
            {
              id: "bwake-luuya",
              name: "Bwake/Luuya",
            },
            {
              id: "mukuyuni",
              name: "Mukuyuni",
            },
            {
              id: "south-bukusu",
              name: "South Bukusu",
            },
          ],
        },
        {
          id: "bumula",
          name: "Bumula",
          wards: [
            {
              id: "bumula-ward",
              name: "Bumula",
            },
            {
              id: "khasoko",
              name: "Khasoko",
            },
            {
              id: "kabula",
              name: "Kabula",
            },
            {
              id: "kimaeti",
              name: "Kimaeti",
            },
            {
              id: "west-bukusu",
              name: "West Bukusu",
            },
            {
              id: "siboti",
              name: "Siboti",
            },
          ],
        },
        {
          id: "kanduyi",
          name: "Kanduyi",
          wards: [
            {
              id: "bukembe-west",
              name: "Bukembe West",
            },
            {
              id: "bukembe-east",
              name: "Bukembe East",
            },
            {
              id: "township",
              name: "Township",
            },
            {
              id: "khalaba",
              name: "Khalaba",
            },
            {
              id: "musikoma",
              name: "Musikoma",
            },
            {
              id: "east-sang-alo",
              name: "East Sang'alo",
            },
            {
              id: "tuuti",
              name: "Tuuti",
            },
            {
              id: "marakaru",
              name: "Marakaru",
            },
            {
              id: "west-sang-alo",
              name: "West Sang'alo",
            },
          ],
        },
        {
          id: "webuye-east",
          name: "Webuye East",
          wards: [
            {
              id: "mihuu",
              name: "Mihuu",
            },
            {
              id: "ndivisi",
              name: "Ndivisi",
            },
            {
              id: "maraka",
              name: "Maraka",
            },
          ],
        },
        {
          id: "webuye-west",
          name: "Webuye West",
          wards: [
            {
              id: "sitikho",
              name: "Sitikho",
            },
            {
              id: "matulo",
              name: "Matulo",
            },
            {
              id: "bokoli",
              name: "Bokoli",
            },
          ],
        },
        {
          id: "kimilili",
          name: "Kimilili",
          wards: [
            {
              id: "kibingei",
              name: "Kibingei",
            },
            {
              id: "kimilili-ward",
              name: "Kimilili",
            },
            {
              id: "maeni",
              name: "Maeni",
            },
            {
              id: "kamukuywa",
              name: "Kamukuywa",
            },
          ],
        },
        {
          id: "tongaren",
          name: "Tongaren",
          wards: [
            {
              id: "mbakalo",
              name: "Mbakalo",
            },
            {
              id: "naitiri-kabuyefwe",
              name: "Naitiri/Kabuyefwe",
            },
            {
              id: "milima",
              name: "Milima",
            },
            {
              id: "ndalu-tabani",
              name: "Ndalu/Tabani",
            },
            {
              id: "tongaren-ward",
              name: "Tongaren",
            },
            {
              id: "soysambu-mitua",
              name: "Soysambu/Mitua",
            },
          ],
        },
      ],
    },
    {
      id: "busia",
      name: "Busia",
      constituencies: [
        {
          id: "teso-north",
          name: "Teso North",
          wards: [
            { id: "malaba-central", name: "Malaba Central" },
            { id: "malaba-north", name: "Malaba North" },
            { id: "angurai-south", name: "Ang'urai South" },
            { id: "malaba-south", name: "Malaba South" },
            { id: "angurai-north", name: "Ang'urai North" },
            { id: "angurai-east", name: "Ang'urai East" },
          ],
        },
        {
          id: "teso-south",
          name: "Teso South",
          wards: [
            { id: "ang-orom", name: "Ang'orom" },
            { id: "chakoi-south", name: "Chakoi South" },
            { id: "amukura-central", name: "Amukura Central" },
            { id: "chakoi-north", name: "Chakoi North" },
            { id: "amukura-east", name: "Amukura East" },
            { id: "amukura-west", name: "Amukura West" },
          ],
        },
        {
          id: "nambale",
          name: "Nambale",
          wards: [
            { id: "nambale-township", name: "Nambale Township" },
            { id: "bukhayo-north-walatsi", name: "Bukhayo North/Walatsi" },
            { id: "bukhayo-east", name: "Bukhayo East" },
            { id: "bukhayo-central", name: "Bukhayo Central" },
          ],
        },
        {
          id: "matayos",
          name: "Matayos",
          wards: [
            { id: "bukhayo-west", name: "Bukhayo West" },
            { id: "mayenje", name: "Mayenje" },
            { id: "matayos-south", name: "Matayos South" },
            { id: "busibwabo", name: "Busibwabo" },
            { id: "burumba", name: "Burumba" },
          ],
        },
        {
          id: "butula",
          name: "Butula",
          wards: [
            { id: "marachi-west", name: "Marachi West" },
            { id: "kingandole", name: "Kingandole" },
            { id: "marachi-central", name: "Marachi Central" },
            { id: "marachi-east", name: "Marachi East" },
            { id: "marachi-north", name: "Marachi North" },
            { id: "elugulu", name: "Elugulu" },
          ],
        },
        {
          id: "funyula",
          name: "Funyula",
          wards: [
            { id: "namboboto-nambuku", name: "Namboboto Nambuku" },
            { id: "nangina", name: "Nangina" },
            { id: "agenga-nanguba", name: "Ageng'a Nanguba" },
            { id: "bwiri", name: "Bwiri" },
          ],
        },
        {
          id: "budalangi",
          name: "Budalangi",
          wards: [
            { id: "rukala", name: "Rukala" },
            { id: "bunyala-south", name: "Bunyala South" },
            { id: "bunyala-west", name: "Bunyala West" },
            { id: "bunyala-central", name: "Bunyala Central" },
          ],
        },
      ],
    },
    {
      id: "elgeyo-marakwet",
      name: "Elgeyo-Marakwet",
      constituencies: [
        {
          id: "marakwet-east",
          name: "Marakwet East",
          wards: [
            { id: "kapyego", name: "Kapyego" },
            { id: "sambirir", name: "Sambirir" },
            { id: "endo", name: "Endo" },
            { id: "embobut-embulot", name: "Embobut/Embulot" },
          ],
        },
        {
          id: "marakwet-west",
          name: "Marakwet West",
          wards: [
            { id: "lelan", name: "Lelan" },
            { id: "sengwer", name: "Sengwer" },
            { id: "cherangany-chebororwa", name: "Cherang'any/Chebororwa" },
            { id: "moiben-kuserwo", name: "Moiben/Kuserwo" },
            { id: "kapsowar", name: "Kapsowar" },
            { id: "arror", name: "Arror" },
          ],
        },
        {
          id: "keiyo-north",
          name: "Keiyo North",
          wards: [
            { id: "kamariny", name: "Kamariny" },
            { id: "emsoo", name: "Emsoo" },
            { id: "tambach", name: "Tambach" },
            { id: "kapchemutwa", name: "Kapchemutwa" },
          ],
        },
        {
          id: "keiyo-south",
          name: "Keiyo South",
          wards: [
            { id: "kaptarakwa", name: "Kaptarakwa" },
            { id: "chepkorio", name: "Chepkorio" },
            { id: "soy-north", name: "Soy North" },
            { id: "soy-south", name: "Soy South" },
            { id: "kabiemit", name: "Kabiemit" },
            { id: "metkei", name: "Metkei" },
          ],
        },
      ],
    },
    {
      id: "embu",
      name: "Embu",
      constituencies: [
        {
          id: "manyatta",
          name: "Manyatta",
          wards: [
            { id: "nginda", name: "Nginda" },
            { id: "mati", name: "Mati" },
            { id: "kithimu", name: "Kithimu" },
            { id: "gogot", name: "Gogot" },
            { id: "central-ward", name: "Central Ward" },
            { id: "nembure", name: "Nembure" },
          ],
        },
        {
          id: "runyenjes",
          name: "Runyenjes",
          wards: [
            { id: "runyenjes-central", name: "Runyenjes Central" },
            { id: "runyenjes-north", name: "Runyenjes North" },
            { id: "kyeni-south", name: "Kyeni South" },
            { id: "kyeni-north", name: "Kyeni North" },
            { id: "kagaari-south", name: "Kagaari South" },
            { id: "kagaari-north", name: "Kagaari North" },
          ],
        },
        {
          id: "mbeere-south",
          name: "Mbeere South",
          wards: [
            { id: "maavani", name: "Maavani" },
            { id: "mwea", name: "Mwea" },
            { id: "tebere", name: "Tebere" },
            { id: "makima", name: "Makima" },
            { id: "evurore", name: "Evurore" },
          ],
        },
        {
          id: "mbeere-north",
          name: "Mbeere North",
          wards: [
            { id: "gitiburi", name: "Gitiburi" },
            { id: "kiambere", name: "Kiambere" },
            { id: "mavuria", name: "Mavuria" },
            { id: "nukia", name: "Nukia" },
          ],
        },
      ],
    },
    {
      id: "garissa",
      name: "Garissa",
      constituencies: [
        {
          id: "garissa-township",
          name: "Garissa Township",
          wards: [
            { id: "waberi", name: "Waberi" },
            { id: "galbet", name: "Galbet" },
            { id: "township-garissa", name: "Township" },
            { id: "iftin", name: "Iftin" },
          ],
        },
        {
          id: "balambala",
          name: "Balambala",
          wards: [
            { id: "balambala-ward", name: "Balambala" },
            { id: "danyere", name: "Danyere" },
            { id: "jarajara", name: "Jarajara" },
            { id: "saka", name: "Saka" },
            { id: "sankuri", name: "Sankuri" },
          ],
        },
        {
          id: "lagdera",
          name: "Lagdera",
          wards: [
            { id: "modogashe", name: "Modogashe" },
            { id: "benane", name: "Benane" },
            { id: "goreale", name: "Goreale" },
            { id: "maalamin", name: "Maalamin" },
            { id: "sabena", name: "Sabena" },
            { id: "baraki", name: "Baraki" },
          ],
        },
        {
          id: "dadaab",
          name: "Dadaab",
          wards: [
            { id: "dertu", name: "Dertu" },
            { id: "dadaab-ward", name: "Dadaab" },
            { id: "labasigale", name: "Labisgale" },
            { id: "damajale", name: "Damajale" },
            { id: "liboi", name: "Liboi" },
            { id: "abakaile", name: "Abakaile" },
          ],
        },
        {
          id: "fafi",
          name: "Fafi",
          wards: [
            { id: "bura", name: "Bura" },
            { id: "dekaharia", name: "Dekaharia" },
            { id: "jarajila", name: "Jarajila" },
            { id: "fafi-ward", name: "Fafi" },
            { id: "nanighi", name: "Nanighi" },
          ],
        },
        {
          id: "ijara",
          name: "Ijara",
          wards: [
            { id: "hulugho", name: "Hulugho" },
            { id: "sangailu", name: "Sangailu" },
            { id: "ijara-ward", name: "Ijara" },
            { id: "masalani", name: "Masalani" },
          ],
        },
      ],
    },
    {
      id: "homa-bay",
      name: "Homa Bay",
      constituencies: [
        {
          id: "homa-bay-town",
          name: "Homa Bay Town",
          wards: [
            { id: "homa-bay-a", name: "Homa Bay A" },
            { id: "homa-bay-b", name: "Homa Bay B" },
            { id: "kanyamwa-kosewe", name: "Kanyamwa Kosewe" },
            { id: "kanyamwa-kologi", name: "Kanyamwa Kologi" },
          ],
        },
        {
          id: "kabondo-kasipul",
          name: "Kabondo Kasipul",
          wards: [
            { id: "kabuoch", name: "Kabuoch" },
            { id: "koyugi-kabuoch", name: "Koyugi/Kabuoch" },
            { id: "kadel", name: "Kadel" },
            { id: "kokwanyo-kakelo", name: "Kokwanyo/Kakelo" },
          ],
        },
        {
          id: "karachuonyo",
          name: "Karachuonyo",
          wards: [
            { id: "north-karachuonyo", name: "North Karachuonyo" },
            { id: "central-karachuonyo", name: "Central Karachuonyo" },
            { id: "west-karachuonyo", name: "West Karachuonyo" },
            { id: "eastern-karachuonyo", name: "Eastern Karachuonyo" },
            { id: "kendu-bay-town", name: "Kendu Bay Town" },
            { id: "wangchieng", name: "Wangchieng" },
          ],
        },
        {
          id: "kasipul",
          name: "Kasipul",
          wards: [
            { id: "central-kasipul", name: "Central Kasipul" },
            { id: "east-kasipul", name: "East Kasipul" },
            { id: "west-kasipul", name: "West Kasipul" },
            { id: "south-kasipul", name: "South Kasipul" },
          ],
        },
        {
          id: "suba-north",
          name: "Suba North",
          wards: [
            { id: "rusinga-island", name: "Rusinga Island" },
            { id: "mbita", name: "Mbita" },
            { id: "kasgunga", name: "Kasgunga" },
            { id: "mfangano-island", name: "Mfangano Island" },
          ],
        },
        {
          id: "ndhiwa",
          name: "Ndhiwa",
          wards: [
            { id: "kwabwai", name: "Kwabwai" },
            { id: "kanyadoto", name: "Kanyadoto" },
            { id: "kabouch-north", name: "Kabouch North" },
            { id: "kabouch-south", name: "Kabouch South" },
            { id: "kanyikela", name: "Kanyikela" },
            { id: "ndhiwa-central", name: "Ndhiwa Central" },
            { id: "ndhiwa-south", name: "Ndhiwa South" },
          ],
        },
        {
          id: "rangwe",
          name: "Rangwe",
          wards: [
            { id: "east-gembat", name: "East Gembat" },
            { id: "west-gembat", name: "West Gembat" },
            { id: "kamaoa", name: "Kamaoa" },
            { id: "koyola", name: "Koyola" },
          ],
        },
        {
          id: "suba-south",
          name: "Suba South",
          wards: [
            { id: "gwassi-south", name: "Gwassi South" },
            { id: "gwassi-north", name: "Gwassi North" },
            { id: "gwassi-central", name: "Gwassi Central" },
            { id: "gwassi-east", name: "Gwassi East" },
          ],
        },
      ],
    },
    {
      id: "isiolo",
      name: "Isiolo",
      constituencies: [
        {
          id: "isiolo-north",
          name: "Isiolo North",
          wards: [
            { id: "wabera", name: "Wabera" },
            { id: "bula-pesa", name: "Bula Pesa" },
            { id: "burat", name: "Burat" },
            { id: "ngaremara", name: "Ngaremara" },
            { id: "oldonyiro", name: "Oldonyiro" },
            { id: "cherab", name: "Cherab" },
            { id: "chari", name: "Chari" },
          ],
        },
        {
          id: "isiolo-south",
          name: "Isiolo South",
          wards: [
            { id: "garba-tulla", name: "Garba Tulla" },
            { id: "kinna", name: "Kinna" },
            { id: "sericho", name: "Sericho" },
          ],
        },
      ],
    },
    {
      id: "kajiado",
      name: "Kajiado",
      constituencies: [
        {
          id: "kajiado-north",
          name: "Kajiado North",
          wards: [
            { id: "olkeri", name: "Olkeri" },
            { id: "ongata-rongai", name: "Ongata Rongai" },
            { id: "nkaimurunya", name: "Nkaimurunya" },
            { id: "oloolua", name: "Oloolua" },
            { id: "ngong", name: "Ngong" },
          ],
        },
        {
          id: "kajiado-central",
          name: "Kajiado Central",
          wards: [
            { id: "purko", name: "Purko" },
            { id: "ildamat", name: "Ildamat" },
            { id: "dalalekutuk", name: "Dalalekutuk" },
            { id: "matapato-north", name: "Matapato North" },
            { id: "matapato-south", name: "Matapato South" },
          ],
        },
        {
          id: "kajiado-east",
          name: "Kajiado East",
          wards: [
            { id: "kaputiei-north", name: "Kaputiei North" },
            { id: "kitengela", name: "Kitengela" },
            { id: "oloosirkon-sholinke", name: "Oloosirkon/Sholinke" },
            { id: "kenyawa-poka", name: "Kenyawa-Poka" },
            { id: "imaroro", name: "Imaroro" },
          ],
        },
        {
          id: "kajiado-west",
          name: "Kajiado West",
          wards: [
            { id: "keekonyokie", name: "Keekonyokie" },
            { id: "iloodokilani", name: "Iloodokilani" },
            { id: "magadi", name: "Magadi" },
            { id: "ewuaso-oonkidong-i", name: "Ewuaso Oo Nkidong'i" },
            { id: "mosiro", name: "Mosiro" },
          ],
        },
        {
          id: "kajiado-south",
          name: "Kajiado South",
          wards: [
            { id: "entonet-lenkisi", name: "Entonet/Lenkisi" },
            { id: "mbirikani-eselenkei", name: "Mbirikani/Eselenkei" },
            { id: "keikuku", name: "Keikuku" },
            { id: "rombo", name: "Rombo" },
            { id: "kimana", name: "Kimana" },
          ],
        },
      ],
    },
    {
      id: "kakamega",
      name: "Kakamega",
      constituencies: [
        {
          id: "lugari",
          name: "Lugari",
          wards: [
            { id: "lumakanda", name: "Lumakanda" },
            { id: "lugari", name: "Lugari" },
            { id: "likuyani-ward", name: "Likuyani" },
            { id: "chekalini", name: "Chekalini" },
            { id: "mautuma", name: "Mautuma" },
            { id: "lwandeti", name: "Lwandeti" },
          ],
        },
        {
          id: "likuyani",
          name: "Likuyani",
          wards: [
            { id: "sango", name: "Sango" },
            { id: "ng'arisha", name: "Ng'arisha" },
            { id: "mutunyi", name: "Mutunyi" },
            { id: "kongoni", name: "Kongoni" },
            { id: "nzoia", name: "Nzoia" },
          ],
        },
        {
          id: "malava",
          name: "Malava",
          wards: [
            { id: "south-kabrasi", name: "South Kabrasi" },
            { id: "north-kabrasi", name: "North Kabrasi" },
            { id: "west-kabrasi", name: "West Kabrasi" },
            { id: "east-kabrasi", name: "East Kabrasi" },
            { id: "central-kabrasi", name: "Central Kabrasi" },
            { id: "chemuche", name: "Chemuche" },
            { id: "butali-chegulo", name: "Butali/Chegulo" },
          ],
        },
        {
          id: "lurambi",
          name: "Lurambi",
          wards: [
            { id: "mangalika", name: "Mangalika" },
            { id: "shirere", name: "Shirere" },
            { id: "mahiakalo", name: "Mahiakalo" },
            { id: "navakholo", name: "Navakholo" },
            { id: "emabole", name: "Emabole" },
            { id: "mukhonje", name: "Mukhonje" },
          ],
        },
        {
          id: "navakholo",
          name: "Navakholo",
          wards: [
            { id: "ingostse-mathia", name: "Ingostse-Mathia" },
            { id: "bunyala-west", name: "Bunyala West" },
            { id: "bunyala-east", name: "Bunyala East" },
            { id: "chemuche-ward", name: "Chemuche" },
            { id: "bunyala-central-navakholo", name: "Bunyala Central" },
          ],
        },
        {
          id: "mumias-east",
          name: "Mumias East",
          wards: [
            { id: "east-wanga", name: "East Wanga" },
            { id: "lukusi", name: "Lukusi" },
            { id: "musanda", name: "Musanda" },
          ],
        },
        {
          id: "mumias-west",
          name: "Mumias West",
          wards: [
            { id: "mumias-central", name: "Mumias Central" },
            { id: "einzak", name: "Einzak" },
            { id: "lureko", name: "Lureko" },
            { id: "mumias-north", name: "Mumias North" },
          ],
        },
        {
          id: "matungu",
          name: "Matungu",
          wards: [
            { id: "koyonzo", name: "Koyonzo" },
            { id: "mayoni", name: "Mayoni" },
            { id: "namamali", name: "Namamali" },
            { id: "kholera", name: "Kholera" },
            { id: "lubinu", name: "Lubinu" },
          ],
        },
        {
          id: "butere",
          name: "Butere",
          wards: [
            { id: "marama-west", name: "Marama West" },
            { id: "marama-east", name: "Marama East" },
            { id: "marama-central", name: "Marama Central" },
            { id: "marama-north", name: "Marama North" },
            { id: "marama-south", name: "Marama South" },
          ],
        },
        {
          id: "khwisero",
          name: "Khwisero",
          wards: [
            { id: "kisa-north", name: "Kisa North" },
            { id: "kisa-east", name: "Kisa East" },
            { id: "kisa-west", name: "Kisa West" },
            { id: "kisa-south", name: "Kisa South" },
          ],
        },
        {
          id: "shinyalu",
          name: "Shinyalu",
          wards: [
            { id: "isanjiro", name: "Isanjiro" },
            { id: "murhanda", name: "Murhanda" },
            { id: "lumakanda-shinyalu", name: "Lumakanda" },
            { id: "ibokolo", name: "Ibokolo" },
            { id: "shitoli", name: "Shitoli" },
            { id: "maanda", name: "Maanda" },
          ],
        },
        {
          id: "ikolomani",
          name: "Ikolomani",
          wards: [
            { id: "kholera-ikolomani", name: "Kholera" },
            { id: "chembuk", name: "Chembuk" },
            { id: "lumakanda-ikolomani", name: "Lumakanda" },
            { id: "eabalo", name: "Eabalo" },
          ],
        },
      ],
    },
    {
      id: "kericho",
      name: "Kericho",
      constituencies: [
        {
          id: "kipkelion-east",
          name: "Kipkelion East",
          wards: [
            { id: "londiani", name: "Londiani" },
            { id: "kedowa-kimugul", name: "Kedowa/Kimugul" },
            { id: "chepseon", name: "Chepseon" },
            { id: "tendeno-sorget", name: "Tendeno/Sorget" },
          ],
        },
        {
          id: "kipkelion-west",
          name: "Kipkelion West",
          wards: [
            { id: "kunyak", name: "Kunyak" },
            { id: "kamasian", name: "Kamasian" },
            { id: "kipkelion", name: "Kipkelion" },
            { id: "chilchila", name: "Chilchila" },
          ],
        },
        {
          id: "ainamoi",
          name: "Ainamoi",
          wards: [
            { id: "kapsoit", name: "Kapsoit" },
            { id: "ainamoi-ward", name: "Ainamoi" },
            { id: "kipchebor", name: "Kipchebor" },
            { id: "kapkugerwet", name: "Kapkugerwet" },
            { id: "kipchimchim", name: "Kipchimchim" },
            { id: "kapsaos", name: "Kapsaos" },
          ],
        },
        {
          id: "bureti",
          name: "Bureti",
          wards: [
            { id: "kisiara", name: "Kisiara" },
            { id: "tebesonik", name: "Tebesonik" },
            { id: "cheboin", name: "Cheboin" },
            { id: "chemosot", name: "Chemosot" },
            { id: "litein", name: "Litein" },
            { id: "cheplanget", name: "Cheplanget" },
            { id: "kapkatet", name: "Kapkatet" },
          ],
        },
        {
          id: "belgut",
          name: "Belgut",
          wards: [
            { id: "waldai", name: "Waldai" },
            { id: "kabianga", name: "Kabianga" },
            { id: "cheptororiet-seretut", name: "Cheptororiet/Seretut" },
            { id: "chaik", name: "Chaik" },
            { id: "kapsuser", name: "Kapsuser" },
          ],
        },
        {
          id: "sigowet-soin",
          name: "Sigowet/Soin",
          wards: [
            { id: "sigowet", name: "Sigowet" },
            { id: "kaplelartet", name: "Kaplelartet" },
            { id: "soliat", name: "Soliat" },
            { id: "soin", name: "Soin" },
          ],
        },
      ],
    },
    {
      id: "kiambu",
      name: "Kiambu",
      constituencies: [
        {
          id: "gatundu-south",
          name: "Gatundu South",
          wards: [
            { id: "ngenda", name: "Ngenda" },
            { id: "kiganjo", name: "Kiganjo" },
            { id: "gatundu", name: "Gatundu" },
            { id: "karambi", name: "Karambi" },
          ],
        },
        {
          id: "gatundu-north",
          name: "Gatundu North",
          wards: [
            { id: "gituamba", name: "Gituamba" },
            { id: "chomo", name: "Chomo" },
            { id: "igaciri", name: "Igaciri" },
            { id: "mang'u", name: "Mang'u" },
          ],
        },
        {
          id: "juja",
          name: "Juja",
          wards: [
            { id: "murera", name: "Murera" },
            { id: "kalimoni", name: "Kalimoni" },
            { id: "juja-ward", name: "Juja" },
            { id: "witeithie", name: "Witeithie" },
            { id: "manga", name: "Manga" },
          ],
        },
        {
          id: "thika-town",
          name: "Thika Town",
          wards: [
            { id: "township-thika", name: "Township" },
            { id: "kamenu", name: "Kamenu" },
            { id: "hospital", name: "Hospital" },
            { id: "gatuanyaga", name: "Gatuanyaga" },
            { id: "ngoliba", name: "Ngoliba" },
          ],
        },
        {
          id: "ruiru",
          name: "Ruiru",
          wards: [
            { id: "gatei", name: "Gatei" },
            { id: "biashara", name: "Biashara" },
            { id: "kahawa-sukari", name: "Kahawa Sukari" },
            { id: "kahawa-wendani", name: "Kahawa Wendani" },
            { id: "membley", name: "Membley" },
            { id: "githurai", name: "Githurai" },
          ],
        },
        {
          id: "githunguri",
          name: "Githunguri",
          wards: [
            { id: "githunguri-ward", name: "Githunguri" },
            { id: "i-githunguri", name: "I-Githunguri" },
            { id: "ngewa", name: "Ngewa" },
            { id: "komothai", name: "Komothai" },
            { id: "kijabe", name: "Kijabe" },
          ],
        },
        {
          id: "kiambu-town",
          name: "Kiambu Town",
          wards: [
            { id: "tinganga", name: "Ting'ang'a" },
            { id: "ndarugo", name: "Ndarugo" },
            { id: "riabai", name: "Riabai" },
            { id: "bunda", name: "Bunda" },
          ],
        },
        {
          id: "kiambaa",
          name: "Kiambaa",
          wards: [
            { id: "cianda", name: "Cianda" },
            { id: "ndenderu", name: "Ndenderu" },
            { id: "karuri", name: "Karuri" },
            { id: "kiumbu", name: "Kiumbu" },
            { id: "muchai", name: "Muchai" },
          ],
        },
        {
          id: "kabete",
          name: "Kabete",
          wards: [
            { id: "gitithia", name: "Gitithia" },
            { id: "ndunyu", name: "Ndunyu" },
            { id: "kagema", name: "Kagema" },
            { id: "gichongo", name: "Gichongo" },
            { id: "kambaa", name: "Kambaa" },
          ],
        },
        {
          id: "kikuyu",
          name: "Kikuyu",
          wards: [
            { id: "kikuyu-ward", name: "Kikuyu" },
            { id: "kinoo", name: "Kinoo" },
            { id: "karai", name: "Karai" },
            { id: "nugumo", name: "Nugumo" },
            { id: "sigona", name: "Sigona" },
          ],
        },
        {
          id: "limuru",
          name: "Limuru",
          wards: [
            { id: "limuru-central", name: "Limuru Central" },
            { id: "bibirioni", name: "Bibirioni" },
            { id: "limuru-east", name: "Limuru East" },
            { id: "nugu", name: "Nugu" },
            { id: "tigoni", name: "Tigoni" },
          ],
        },
        {
          id: "lari",
          name: "Lari",
          wards: [
            { id: "kamburu", name: "Kamburu" },
            { id: "kogono", name: "Kogono" },
            { id: "kiyabi", name: "Kiyabi" },
            { id: "kamburu-giteme", name: "Kamburu-Giteme" },
            { id: "esokoni", name: "Esokoni" },
          ],
        },
      ],
    },
    {
      id: "kilifi",
      name: "Kilifi",
      constituencies: [
        {
          id: "kilifi-north",
          name: "Kilifi North",
          wards: [
            { id: "tezo", name: "Tezo" },
            { id: "sokoni", name: "Sokoni" },
            { id: "kibarani", name: "Kibarani" },
            { id: "dabaso", name: "Dabaso" },
            { id: "matsangoni", name: "Matsangoni" },
            { id: "watamu", name: "Watamu" },
            { id: "mnarani", name: "Mnarani" },
          ],
        },
        {
          id: "kilifi-south",
          name: "Kilifi South",
          wards: [
            { id: "junju", name: "Junju" },
            { id: "mwarakaya", name: "Mwarakaya" },
            { id: "shimo-la-tewa", name: "Shimo la Tewa" },
            { id: "chasimba", name: "Chasimba" },
            { id: "mtepeni", name: "Mtepeni" },
          ],
        },
        {
          id: "malindi",
          name: "Malindi",
          wards: [
            { id: "jilore", name: "Jilore" },
            { id: "kakuyuni", name: "Kakuyuni" },
            { id: "ganda", name: "Ganda" },
            { id: "malindi-town", name: "Malindi Town" },
            { id: "shella", name: "Shella" },
          ],
        },
        {
          id: "magarini",
          name: "Magarini",
          wards: [
            { id: "maarafa", name: "Maarafa" },
            { id: "magarini-ward", name: "Magarini" },
            { id: "gongoni", name: "Gongoni" },
            { id: "adu", name: "Adu" },
            { id: "garashi", name: "Garashi" },
            { id: "sabaki", name: "Sabaki" },
          ],
        },
        {
          id: "rabai",
          name: "Rabai",
          wards: [
            { id: "rabai-kisuruti", name: "Rabai/Kisuruti" },
            { id: "mwawesa", name: "Mwawesa" },
            { id: "kambe-ribe", name: "Kambe/Ribe" },
            { id: "ruruma", name: "Ruruma" },
          ],
        },
        {
          id: "ganze",
          name: "Ganze",
          wards: [
            { id: "jaribuni", name: "Jaribuni" },
            { id: "sokoke", name: "Sokoke" },
            { id: "ganze-ward", name: "Ganze" },
            { id: "vitengeni", name: "Vitengeni" },
            { id: "bamba", name: "Bamba" },
          ],
        },
        {
          id: "kaloleni",
          name: "Kaloleni",
          wards: [
            { id: "mitingoni", name: "Mitingoni" },
            { id: "manga-kaloleni", name: "Manga" },
            { id: "kasimba", name: "Kasimba" },
            { id: "mariakani", name: "Mariakani" },
          ],
        },
      ],
    },
    {
      id: "kirinyaga",
      name: "Kirinyaga",
      constituencies: [
        {
          id: "kirinyaga-central",
          name: "Kirinyaga Central",
          wards: [
            { id: "mutira", name: "Mutira" },
            { id: "kerugoya", name: "Kerugoya" },
            { id: "kanyekiini", name: "Kanyekiini" },
            { id: "inoi", name: "Inoi" },
          ],
        },
        {
          id: "kirinyaga-east",
          name: "Kirinyaga East",
          wards: [
            { id: "ngariama", name: "Ngariama" },
            { id: "kamweti", name: "Kamweti" },
            { id: "gichugu", name: "Gichugu" },
            { id: "kianyaga", name: "Kianyaga" },
            { id: "kagumo", name: "Kagumo" },
          ],
        },
        {
          id: "kirinyaga-west",
          name: "Kirinyaga West",
          wards: [
            { id: "baragwi", name: "Baragwi" },
            { id: "kiyagu", name: "Kiyagu" },
            { id: "ndia", name: "Ndia" },
            { id: "kariti", name: "Kariti" },
            { id: "gathigiriri", name: "Gathigiriri" },
          ],
        },
        {
          id: "mwea",
          name: "Mwea",
          wards: [
            { id: "mwea-rice-scheme", name: "Mwea Rice Scheme" },
            { id: "kangai", name: "Kangai" },
            { id: "thiba", name: "Thiba" },
            { id: "mutithi", name: "Mutithi" },
            { id: "tebere-mwea", name: "Tebere" },
            { id: "makima-mwea", name: "Makima" },
          ],
        },
      ],
    },
    {
      id: "kisii",
      name: "Kisii",
      constituencies: [
        {
          id: "kitutu-chache-north",
          name: "Kitutu Chache North",
          wards: [
            { id: "monyerero", name: "Monyerero" },
            { id: "sengera", name: "Sengera" },
            { id: "bobore", name: "Bobore" },
            { id: "marani", name: "Marani" },
            { id: "kiamokama", name: "Kiamokama" },
          ],
        },
        {
          id: "kitutu-chache-south",
          name: "Kitutu Chache South",
          wards: [
            { id: "bogeka", name: "Bogeka" },
            { id: "nyatieko", name: "Nyatieko" },
            { id: "kitutu-central", name: "Kitutu Central" },
            { id: "nyakoe", name: "Nyakoe" },
            { id: "kiogoro", name: "Kiogoro" },
          ],
        },
        {
          id: "bonchari",
          name: "Bonchari",
          wards: [
            { id: "bomariba", name: "Bomariba" },
            { id: "boochi-samooge", name: "Boochi/Samooge" },
            { id: "bokeira", name: "Bokeira" },
            { id: "riabai-bonchari", name: "Riabai" },
            { id: "riga", name: "Riga" },
          ],
        },
        {
          id: "nyaribari-chache",
          name: "Nyaribari Chache",
          wards: [
            { id: "bobasi-bogetaorio", name: "Bobasi Bogetaorio" },
            { id: "keumbu", name: "Keumbu" },
            { id: "kisii-central", name: "Kisii Central" },
            { id: "bomariba-nyaribari", name: "Bomariba" },
            { id: "bogiakumu", name: "Bogiakumu" },
          ],
        },
        {
          id: "nyaribari-masaba",
          name: "Nyaribari Masaba",
          wards: [
            { id: "ichuni", name: "Ichuni" },
            { id: "masaba", name: "Masaba" },
            { id: "gesi", name: "Gesi" },
            { id: "kiyamahian", name: "Kiyamahian" },
            { id: "nyamasibi", name: "Nyamasibi" },
          ],
        },
        {
          id: "bobasi",
          name: "Bobasi",
          wards: [
            { id: "bogetaorio", name: "Bogetaorio" },
            { id: "boochi", name: "Boochi" },
            { id: "bobasi-chache", name: "Bobasi Chache" },
            { id: "nyacheki", name: "Nyacheki" },
            { id: "sameta", name: "Sameta" },
          ],
        },
        {
          id: "south-mugirango",
          name: "South Mugirango",
          wards: [
            { id: "bogetenga", name: "Bogetenga" },
            { id: "boikanga", name: "Boikanga" },
            { id: "moticho", name: "Moticho" },
            { id: "getenga", name: "Getenga" },
            { id: "tabaka", name: "Tabaka" },
          ],
        },
        {
          id: "bomachoge-borabu",
          name: "Bomachoge Borabu",
          wards: [
            { id: "bombaba", name: "Bombaba" },
            { id: "bogirango", name: "Bogirango" },
            { id: "bogitaa", name: "Bogitaa" },
            { id: "bokimonge", name: "Bokimonge" },
            { id: "bomeroka", name: "Bomeroka" },
          ],
        },
        {
          id: "bomachoge-chache",
          name: "Bomachoge Chache",
          wards: [
            { id: "boigesa", name: "Boigesa" },
            { id: "boitang-are", name: "Boitang'are" },
            { id: "bombore", name: "Bombore" },
            { id: "mosora", name: "Mosora" },
            { id: "bosigisa", name: "Bosigisa" },
          ],
        },
      ],
    },

    {
      id: "kitui",
      name: "Kitui",
      constituencies: [
        {
          id: "mwingi_north",
          name: "Mwingi North",
          wards: [
            { id: "ngomeni", name: "Ngomeni" },
            { id: "kyuso", name: "Kyuso" },
            { id: "mumoni", name: "Mumoni" },
            { id: "tseikuru", name: "Tseikuru" },
            { id: "tharaka", name: "Tharaka" },
          ],
        },
        {
          id: "mwingi_west",
          name: "Mwingi West",
          wards: [
            { id: "kyome_thaana", name: "Kyome/Thaana" },
            { id: "nguutani", name: "Nguutani" },
            { id: "migwani", name: "Migwani" },
            { id: "kiomo_kyethani", name: "Kiomo/Kyethani" },
          ],
        },
        {
          id: "mwingi_central",
          name: "Mwingi Central",
          wards: [
            { id: "mwingi_central_ward", name: "Central" },
            { id: "kivou", name: "Kivou" },
            { id: "nguni", name: "Nguni" },
            { id: "nuu", name: "Nuu" },
            { id: "mui", name: "Mui" },
            { id: "waita", name: "Waita" },
          ],
        },
        {
          id: "kitui_west",
          name: "Kitui West",
          wards: [
            { id: "mutonguni", name: "Mutonguni" },
            { id: "kauwi", name: "Kauwi" },
            { id: "matinyani", name: "Matinyani" },
            { id: "kwa_mutonga_kithumula", name: "Kwamutonga/Kithumula" },
          ],
        },
        {
          id: "kitui_rural",
          name: "Kitui Rural",
          wards: [
            { id: "kisasi", name: "Kisasi" },
            { id: "mbitini", name: "Mbitini" },
            { id: "kwavonza_yatta", name: "Kwavonza/Yatta" },
            { id: "kanyangi", name: "Kanyangi" },
          ],
        },
        {
          id: "kitui_central",
          name: "Kitui Central",
          wards: [
            { id: "miambani", name: "Miambani" },
            { id: "township", name: "Township" },
            { id: "kyangwithya_west", name: "Kyangwithya West" },
            { id: "mulango", name: "Mulango" },
            { id: "kyangwithya_east", name: "Kyangwithya East" },
          ],
        },
        {
          id: "kitui_east",
          name: "Kitui East",
          wards: [
            { id: "zombe_mwitika", name: "Zombe/Mwitika" },
            { id: "nzambani", name: "Nzambani" },
            { id: "chuluni", name: "Chuluni" },
            { id: "voo_kyamatu", name: "Voo/Kyamatu" },
            { id: "endau_malalani", name: "Endau/Malalani" },
            { id: "mutito_kaliku", name: "Mutito/Kaliku" },
          ],
        },
        {
          id: "kitui_south",
          name: "Kitui South",
          wards: [
            { id: "ikana_kyantune", name: "Ikana/Kyantune" },
            { id: "mutomo", name: "Mutomo" },
            { id: "mutha", name: "Mutha" },
            { id: "ikutha", name: "Ikutha" },
            { id: "kanziko", name: "Kanziko" },
            { id: "athi", name: "Athi" },
          ],
        },
      ],
    },
    {
      id: "kwale",
      name: "Kwale",
      constituencies: [
        {
          id: "lungalunga",
          name: "Lungalunga",
          wards: [
            { id: "vanga", name: "Vanga" },
            { id: "mwereni", name: "Mwereni" },
            { id: "dzombo", name: "Dzombo" },
            { id: "pongwe_kikokeni", name: "Pongwe/Kikokeni" },
          ],
        },
        {
          id: "msambweni",
          name: "Msambweni",
          wards: [
            { id: "ukunda", name: "Ukunda" },
            { id: "kinondo", name: "Kinondo" },
            { id: "gombatobongwe", name: "Gombato Bongwe" },
            { id: "ramisi", name: "Ramisi" },
          ],
        },
        {
          id: "matuga",
          name: "Matuga",
          wards: [
            { id: "mkongani", name: "Mkongani" },
            { id: "tiwi", name: "Tiwi" },
            { id: "kubo_south", name: "Kubo South" },
            { id: "waa", name: "Waa" },
            { id: "tsimba_golini", name: "Tsimba-Golini" },
          ],
        },
        {
          id: "kinango",
          name: "Kinango",
          wards: [
            { id: "mwavumbo", name: "Mwavumbo" },
            { id: "samburu_chengoni", name: "Samburu/Chengoni" },
            { id: "kasemeni", name: "Kasemeni" },
            { id: "mackinon_road", name: "Mackinon Road" },
            { id: "kinango_ward", name: "Kinango" },
            { id: "puma", name: "Puma" },
            { id: "ndavaya", name: "Ndavaya" },
          ],
        },
      ],
    },
    {
      id: "laikipia",
      name: "Laikipia",
      constituencies: [
        {
          id: "laikipia_west",
          name: "Laikipia West",
          wards: [
            { id: "olmoran", name: "Ol Moran" },
            { id: "rumuruti_township", name: "Rumuruti Township" },
            { id: "marmanet", name: "Marmanet" },
            { id: "igwamiti", name: "Igwamiti" },
            { id: "salama", name: "Salama" },
          ],
        },
        {
          id: "laikipia_east",
          name: "Laikipia East",
          wards: [
            { id: "ngobit", name: "Ngobit" },
            { id: "tigithi", name: "Tigithi" },
            { id: "central_laikipia", name: "Central" },
            { id: "nanyuki", name: "Nanyuki" },
            { id: "umande", name: "Umande" },
          ],
        },
        {
          id: "laikipia_north",
          name: "Laikipia North",
          wards: [
            { id: "sosian", name: "Sosian" },
            { id: "mukulal", name: "Mukulal" },
            { id: "il_motiok", name: "Il Motiok" },
            { id: "sekuo", name: "Segera" },
            { id: "ol_jogi", name: "Ol Jogi" },
          ],
        },
      ],
    },
    {
      id: "lamu",
      name: "Lamu",
      constituencies: [
        {
          id: "lamu_east",
          name: "Lamu East",
          wards: [
            { id: "faza", name: "Faza" },
            { id: "kiunga", name: "Kiunga" },
            { id: "basuba", name: "Basuba" },
            { id: "shella", name: "Shella" },
            { id: "mkomani", name: "Mkomani" },
          ],
        },
        {
          id: "lamu_west",
          name: "Lamu West",
          wards: [
            { id: "hindu", name: "Hindi" },
            { id: "hongwe", name: "Hongwe" },
            { id: "bahari", name: "Bahari" },
            { id: "mkunumbi", name: "Mkunumbi" },
            { id: "witu", name: "Witu" },
          ],
        },
      ],
    },
    {
      id: "machakos",
      name: "Machakos",
      constituencies: [
        {
          id: "masinga",
          name: "Masinga",
          wards: [
            { id: "kivaa", name: "Kivaa" },
            { id: "ndithini", name: "Ndalani" },
            { id: "masinga_central", name: "Masinga Central" },
            { id: "muthesya", name: "Muthesya" },
            { id: "e_ngalata", name: "Ekalakala" },
          ],
        },
        {
          id: "yatta",
          name: "Yatta",
          wards: [
            { id: "ndalani", name: "Ndalani" },
            { id: "kwa_vonza", name: "Kinyaata" },
            { id: "matuu", name: "Matuu" },
            { id: "donyo_sabuk", name: "Donyo Sabuk" },
            { id: "kithimani", name: "Kithimani" },
            { id: "iuni", name: "Iuni" },
          ],
        },
        {
          id: "kangundo",
          name: "Kangundo",
          wards: [
            { id: "kangundo_north", name: "Kangundo North" },
            { id: "kangundo_central", name: "Kangundo Central" },
            { id: "kangundo_east", name: "Kangundo East" },
            { id: "kangundo_west", name: "Kangundo West" },
          ],
        },
        {
          id: "matungulu",
          name: "Matungulu",
          wards: [
            { id: "starehe", name: "Starehe" },
            { id: "kwa_katana", name: "Kola" },
            { id: "matungulu_east", name: "Matungulu East" },
            { id: "matungulu_west", name: "Matungulu West" },
            { id: "tala", name: "Tala" },
          ],
        },
        {
          id: "kathiani",
          name: "Kathiani",
          wards: [
            { id: "katani", name: "Katani" },
            { id: "lower_kaewa", name: "Lower Kaewa/Kaani" },
            { id: "kathiani_central", name: "Kathiani Central" },
            { id: "upper_kaewa", name: "Upper Kaewa/Kaani" },
          ],
        },
        {
          id: "mavoko",
          name: "Mavoko",
          wards: [
            { id: "athiriver", name: "Athi River" },
            { id: "kinanie", name: "Kinanie" },
            { id: "muthwani", name: "Muthwani" },
            { id: "syokimau_mulolongo", name: "Syokimau/Mulolongo" },
            { id: "joska", name: "Joska" },
          ],
        },
        {
          id: "machakos_town",
          name: "Machakos Town",
          wards: [
            { id: "kalama", name: "Kalama" },
            { id: "muvuti_kiima_kimwe", name: "Muvuti/Kiima-Kimwe" },
            { id: "machakos_central", name: "Machakos Central" },
            { id: "kamuthanga", name: "Kamaswa" },
            { id: "muoni", name: "Mumbuni North" },
            { id: "kasinga", name: "Kasinga" },
            { id: "mawa", name: "Mumbuni East" },
          ],
        },
        {
          id: "mwala",
          name: "Mwala",
          wards: [
            { id: "kibauni", name: "Kibauni" },
            { id: "masii", name: "Masii" },
            { id: "mwala_ward", name: "Mwala" },
            { id: "makutano", name: "Makutano/Mwala" },
            { id: "witethye", name: "Mbiuni" },
            { id: "weti", name: "Weti" },
          ],
        },
      ],
    },
    {
      id: "makueni",
      name: "Makueni",
      constituencies: [
        {
          id: "mbooni",
          name: "Mbooni",
          wards: [
            { id: "tulimani", name: "Tulimani" },
            { id: "mbooni_ward", name: "Mbooni" },
            { id: "kithungo_kitundu", name: "Kithungo/Kitundu" },
            { id: "kiteta_kisau", name: "Kiteta/Kisau" },
            { id: "waia_kako", name: "Waia-Kako" },
            { id: "kalawa_ward", name: "Kalawa" },
          ],
        },
        {
          id: "kilome",
          name: "Kilome",
          wards: [
            { id: "kasikeu", name: "Kasikeu" },
            { id: "mukaa", name: "Mukaa" },
            { id: "kiima_kiu_kalanzoni", name: "Kiima Kiu/Kalanzoni" },
          ],
        },
        {
          id: "kaiti",
          name: "Kaiti",
          wards: [
            { id: "ukia", name: "Ukia" },
            { id: "kee", name: "Kee" },
            { id: "kilungu", name: "Kilungu" },
            { id: "ilima", name: "Ilima" },
          ],
        },
        {
          id: "makueni_constituency",
          name: "Makueni",
          wards: [
            { id: "wote", name: "Wote" },
            { id: "muvau_kikumini", name: "Muvau/Kikuumini" },
            { id: "mavindini", name: "Mavindini" },
            { id: "kitise_kithuki", name: "Kitise/Kithuki" },
            { id: "kathonzweni", name: "Kathonzweni" },
            { id: "nzau_kilili_kalamba", name: "Nzau/Kilili/Kalamba" },
            { id: "mbitini_makueni", name: "Mbitini" },
          ],
        },
        {
          id: "kibwezi_west",
          name: "Kibwezi West",
          wards: [
            { id: "makindu", name: "Makindu" },
            { id: "nguumo", name: "Nguumo" },
            { id: "kikumbulyu_north", name: "Kikumbulyu North" },
            { id: "kikumbulyu_south", name: "Kimumbulyu South" },
            { id: "nguu_masumba", name: "Nguu/Masumba" },
            { id: "emali_mulala", name: "Emali/Mulala" },
          ],
        },
        {
          id: "kibwezi_east",
          name: "Kibwezi East",
          wards: [
            { id: "masongaleni", name: "Masongaleni" },
            { id: "mtito_andei", name: "Mtito Andei" },
            { id: "thange", name: "Thange" },
            { id: "ivingoni_nzambani", name: "Ivingoni/Nzambani" },
          ],
        },
      ],
    },
    {
      id: "mandera",
      name: "Mandera",
      constituencies: [
        {
          id: "mandera_west",
          name: "Mandera West",
          wards: [
            { id: "takaba_south", name: "Takaba South" },
            { id: "takaba", name: "Takaba" },
            { id: "lagsure", name: "Lagsure" },
            { id: "dandu", name: "Dandu" },
            { id: "gither", name: "Gither" },
          ],
        },
        {
          id: "banissa",
          name: "Banissa",
          wards: [
            { id: "banissa_ward", name: "Banissa" },
            { id: "derkhale", name: "Derkhale" },
            { id: "guba", name: "Guba" },
            { id: "malkamari", name: "Malkamari" },
            { id: "kiliwehiri", name: "Kiliwehiri" },
          ],
        },
        {
          id: "mandera_north",
          name: "Mandera North",
          wards: [
            { id: "ashabito", name: "Ashabito" },
            { id: "guticha", name: "Guticha" },
            { id: "marothile", name: "Marothile" },
            { id: "rhamu", name: "Rhamu" },
            { id: "rhamu_dimtu", name: "Rhamu Dimtu" },
          ],
        },
        {
          id: "mandera_south",
          name: "Mandera South",
          wards: [
            { id: "wargadud", name: "Wargadud" },
            { id: "kutulo", name: "Kutulo" },
            { id: "elwak_south", name: "Elwak South" },
            { id: "elwak_north", name: "Elwak North" },
            { id: "shimbir_fatuma", name: "Shimbir Fatuma" },
          ],
        },
        {
          id: "mandera_east",
          name: "Mandera East",
          wards: [
            { id: "arabia", name: "Arabia" },
            { id: "libehia", name: "Libehia" },
            { id: "khalalio", name: "Khalalio" },
            { id: "neboi", name: "Neboi" },
            { id: "mandera_township", name: "Township" },
          ],
        },
        {
          id: "lafey",
          name: "Lafey",
          wards: [
            { id: "sala", name: "Sala" },
            { id: "fino", name: "Fino" },
            { id: "lafey_ward", name: "Lafey" },
            { id: "waranqara", name: "Waranqara" },
            { id: "alango_gof", name: "Alango Gof" },
          ],
        },
      ],
    },
    {
      id: "marsabit",
      name: "Marsabit",
      constituencies: [
        {
          id: "moyale",
          name: "Moyale",
          wards: [
            { id: "butiye", name: "Butiye" },
            { id: "sololo", name: "Sololo" },
            { id: "heillu_manyatta", name: "Heillu/Manyatta" },
            { id: "golbo", name: "Golbo" },
            { id: "moyale_township", name: "Moyale Township" },
            { id: "uran", name: "Uran" },
            { id: "obbu", name: "Obbu" },
          ],
        },
        {
          id: "north_horr",
          name: "North Horr",
          wards: [
            { id: "dukana", name: "Dukana" },
            { id: "maikona", name: "Maikona" },
            { id: "turbi", name: "Turbi" },
            { id: "north_horr_ward", name: "North Horr" },
            { id: "illeret", name: "Illeret" },
          ],
        },
        {
          id: "saku",
          name: "Saku",
          wards: [
            { id: "sagante_jaldesa", name: "Sagante/Jaldesa" },
            { id: "karare", name: "Karare" },
            { id: "marsabit_central", name: "Marsabit Central" },
          ],
        },
        {
          id: "laisamis",
          name: "Laisamis",
          wards: [
            { id: "loiyangalani", name: "Loiyangalani" },
            { id: "kargi_south_horr", name: "Kargi/South Horr" },
            { id: "korr_ngurunit", name: "Korr/Ngurunit" },
            { id: "logologo", name: "Logologo" },
            { id: "laisamis_ward", name: "Laisamis" },
          ],
        },
      ],
    },
    {
      id: "meru",
      name: "Meru",
      constituencies: [
        {
          id: "tigania_east",
          name: "Tigania East",
          wards: [
            { id: "mikinduri", name: "Mikinduri" },
            { id: "thangatha", name: "Thangatha" },
            { id: "muthara", name: "Muthara" },
            { id: "karama", name: "Karama" },
            { id: "ashirira", name: "Ashirira" },
          ],
        },
        {
          id: "tigania_west",
          name: "Tigania West",
          wards: [
            { id: "kiguchwa", name: "Kiguchwa" },
            { id: "athwana", name: "Athwana" },
            { id: "akithii", name: "Akithii" },
            { id: "mbeu", name: "Mbeu" },
            { id: "kianjai", name: "Kianjai" },
          ],
        },
        {
          id: "igembe_north",
          name: "Igembe North",
          wards: [
            { id: "antubetwe_kiongo", name: "Antu Betwe Kiongo" },
            { id: "amwathi", name: "Amwathi" },
            { id: "ntunene", name: "Ntunene" },
            { id: "kabiro", name: "Kabiro" },
            { id: "laare", name: "Laare" },
          ],
        },
        {
          id: "igembe_south",
          name: "Igembe South",
          wards: [
            { id: "maua", name: "Maua" },
            { id: "athiru_gama", name: "Athiru Gairu" },
            { id: "kanuni", name: "Kanuni" },
            { id: "kiegoi_antubochiu", name: "Kiegoi/Antubochiu" },
            { id: "akachiu", name: "Akachiu" },
          ],
        },
        {
          id: "north_imenti",
          name: "North Imenti",
          wards: [
            { id: "municipality", name: "Municipality" },
            { id: "makutano", name: "Makutano" },
            { id: "kithaku_kiiru", name: "Kithaku/Kiiru" },
            { id: "ruiri_rwarera", name: "Ruiri/Rwarera" },
            { id: "mwanganthia", name: "Mwanganthia" },
          ],
        },
        {
          id: "south_imenti",
          name: "South Imenti",
          wards: [
            { id: "abogeta_east", name: "Abogeta East" },
            { id: "abogeta_west", name: "Abogeta West" },
            { id: "igoki", name: "Igoki" },
            { id: "mitunguu", name: "Mitunguu" },
            { id: "nkuene", name: "Nkuene" },
            { id: "imba_kiagu", name: "Imba-Kiagu" },
          ],
        },
        {
          id: "buuri",
          name: "Buuri",
          wards: [
            { id: "timau", name: "Timau" },
            { id: "ruthugiti", name: "Ruthugiti" },
            { id: "kiirua_naari", name: "Kiirua/Naari" },
            { id: "kigucwa", name: "Kigucwa" },
            { id: "muthara", name: "Muthara" },
          ],
        },
        {
          id: "igembe_central",
          name: "Igembe Central",
          wards: [
            { id: "athiru_rujine", name: "Athiru Rujine" },
            { id: "igembe_east", name: "Igembe East" },
            { id: "kiembe", name: "Kieme" },
            { id: "kianjairu", name: "Kianjairu" },
            { id: "kanuni", name: "Kanuni" },
          ],
        },
        {
          id: "central_imenti",
          name: "Central Imenti",
          wards: [
            { id: "githongo", name: "Githongo" },
            { id: "mutunyi", name: "Mutunyi" },
            { id: "kibugua", name: "Kibugua" },
            { id: "kiguchwa", name: "Kiguchwa" },
          ],
        },
      ],
    },
    {
      id: "migori",
      name: "Migori",
      constituencies: [
        {
          id: "rongo",
          name: "Rongo",
          wards: [
            { id: "north_kadem", name: "North Kadem" },
            { id: "kanyasa", name: "Kanyasa" },
            { id: "kaler", name: "Kaler" },
            { id: "macalder_kanyarwanda", name: "Macalder Kanyarwanda" },
            { id: "got_kachola", name: "Got Kachola" },
            { id: "muhuru", name: "Muhuru" },
            { id: "kachieng", name: "Kachieng" },
          ],
        },
        {
          id: "awendo",
          name: "Awendo",
          wards: [
            { id: "god_jope", name: "God Jope" },
            { id: "kakrao", name: "Kakrao" },
            { id: "suna_central", name: "Suna Central" },
            { id: "kwa", name: "Kwa" },
          ],
        },
        {
          id: "suna_east",
          name: "Suna East",
          wards: [
            { id: "wiga", name: "Wiga" },
            { id: "wasimbete", name: "Wasimbete" },
            { id: "wasweta_ii", name: "Wasweta II" },
            { id: "oruba_ragana", name: "Oruba Ragana" },
          ],
        },
        {
          id: "suna_west",
          name: "Suna West",
          wards: [
            { id: "north_kamagambo", name: "North Kamagambo" },
            { id: "east_kamagambo", name: "East Kamagambo" },
            { id: "south_kamagambo", name: "South Kamagambo" },
            { id: "central_kamagambo", name: "Central Kamagambo" },
          ],
        },
        {
          id: "uriri",
          name: "Uriri",
          wards: [
            { id: "west_kanyamkago", name: "West Kanyamkago" },
            { id: "north_kanyamkago", name: "North Kanyamkago" },
            { id: "east_kanyamkago", name: "East Kanyamkago" },
            { id: "central_kanyamkago", name: "Central Kanyamkago" },
          ],
        },
        {
          id: "nyatike",
          name: "Nyatike",
          wards: [
            { id: "west_sakwa", name: "West Sakwa" },
            { id: "north_sakwa", name: "North Sakwa" },
            { id: "south_sakwa", name: "South Sakwa" },
            { id: "central_sakwa", name: "Central Sakwa" },
          ],
        },
        {
          id: "kuria_east",
          name: "Kuria East",
          wards: [
            { id: "nyamosense_komosoko", name: "Nyamosense/Komosoko" },
            { id: "tagare", name: "Tagare" },
            { id: "masaba", name: "Masaba" },
            { id: "isebania", name: "Isebania" },
            { id: "makerero", name: "Makerero" },
            { id: "bukira_central_ikerege", name: "Bukira Central/Ikerege" },
            { id: "bukira_east", name: "Bukira East" },
          ],
        },
        {
          id: "kuria_west",
          name: "Kuria West",
          wards: [
            { id: "gokeharaka_getambwega", name: "Gokeharaka/Getambwega" },
            { id: "nyabasi_west", name: "Nyabasi West" },
            { id: "nyabasi_east", name: "Nyabasi East" },
            { id: "ntimaru_west", name: "Ntimaru West" },
            { id: "ntimaru_east", name: "Ntimaru East" },
          ],
        },
      ],
    },
    {
      id: "muranga",
      name: "Murang’a",
      constituencies: [
        {
          id: "kangema",
          name: "Kangema",
          wards: [
            { id: "kanyenya_ini", name: "Kanyenya-Ini" },
            { id: "muguru", name: "Muguru" },
            { id: "rwathia", name: "Rwathia" },
          ],
        },
        {
          id: "mathioya",
          name: "Mathioya",
          wards: [
            { id: "gitugi", name: "Gitugi" },
            { id: "kiru", name: "Kiru" },
            { id: "kamacharia", name: "Kamacharia" },
          ],
        },
        {
          id: "kiharu",
          name: "Kiharu",
          wards: [
            { id: "wangu", name: "Wangu" },
            { id: "mugoiri", name: "Mugoiri" },
            { id: "mbiri", name: "Mbiri" },
            { id: "township_muranga", name: "Township" },
            { id: "murarandia", name: "Murarandia" },
            { id: "gaturi", name: "Gaturi" },
          ],
        },
        {
          id: "kigumo",
          name: "Kigumo",
          wards: [
            { id: "kahumbu", name: "Kahumbu" },
            { id: "muthithi", name: "Muthithi" },
            { id: "kigumo_ward", name: "Kigumo" },
            { id: "kangari", name: "Kangari" },
            { id: "kinyona", name: "Kinyona" },
          ],
        },
        {
          id: "maragwa",
          name: "Maragwa",
          wards: [
            { id: "kimorori_wempa", name: "Kimorori/Wempa" },
            { id: "makuyu", name: "Makuyu" },
            { id: "kambiti", name: "Kambiti" },
            { id: "kamahuha", name: "Kamahuha" },
            { id: "ichagaki", name: "Ichagaki" },
            { id: "nginda", name: "Nginda" },
          ],
        },
        {
          id: "kandara",
          name: "Kandara",
          wards: [
            { id: "ng_araria", name: "Ng'araria" },
            { id: "muruka", name: "Muruka" },
            { id: "kagundu_ini", name: "Kagundu-Ini" },
            { id: "gaichanjiru", name: "Gaichanjiru" },
            { id: "ithiru", name: "Ithiru" },
            { id: "ruchu", name: "Ruchu" },
          ],
        },
        {
          id: "gatanga",
          name: "Gatanga",
          wards: [
            { id: "ithanga", name: "Ithanga" },
            { id: "kakuzi_mitubiri", name: "Kakuzi/Mitubiri" },
            { id: "mugumo_ini", name: "Mugumo-Ini" },
            { id: "kihumbu_ini", name: "Kihumbu-Ini" },
            { id: "gatanga_ward", name: "Gatanga" },
            { id: "kariara", name: "Kariara" },
          ],
        },
      ],
    },
    {
      id: "nandi",
      name: "Nandi",
      constituencies: [
        {
          id: "mosop",
          name: "Mosop",
          wards: [
            { id: "chemuchei", name: "Chemuchei" },
            { id: "kabiyet", name: "Kabiyet" },
            { id: "kipkaren", name: "Kipkaren" },
            { id: "kabisaga", name: "Kabisaga" },
            { id: "kurgung_surungai", name: "Kurgung/Surungai" },
            { id: "sangen", name: "Sangen" },
          ],
        },
        {
          id: "aldai",
          name: "Aldai",
          wards: [
            { id: "kaptumo_kaboi", name: "Kaptumo-Kaboi" },
            { id: "kobujoi", name: "Kobujoi" },
            { id: "terik", name: "Terik" },
            { id: "mizor", name: "Mizor" },
            { id: "kemeloi_maraba", name: "Kemeloi/Maraba" },
            { id: "sasuni", name: "Sasuni" },
          ],
        },
        {
          id: "nandi_hills",
          name: "Nandi Hills",
          wards: [
            { id: "nandi_hills_township", name: "Nandi Hills Township" },
            { id: "chepkunyuk", name: "Chepkunyuk" },
            { id: "olomoi", name: "O'lessos" },
            { id: "kapsabet", name: "Kapsabet" },
          ],
        },
        {
          id: "emgwen",
          name: "Emgwen",
          wards: [
            { id: "kilibwoni", name: "Kilibwoni" },
            { id: "kapsabet_ward_emgwen", name: "Kapsabet" },
            { id: "kapkangani", name: "Kapkangani" },
            { id: "chepkumia", name: "Chepkumia" },
          ],
        },
        {
          id: "chesumei",
          name: "Chesumei",
          wards: [
            { id: "kosirai", name: "Kosirai" },
            { id: "kaptel_kamoiywo", name: "Kaptel/Kamoiywo" },
            { id: "chemundu_kapngetuny", name: "Chemundu/Kapngetuny" },
            { id: "mutwot", name: "Mutwot" },
            { id: "chebilat", name: "Chebilat" },
          ],
        },
        {
          id: "tinderet",
          name: "Tinderet",
          wards: [
            { id: "songhor_sabit", name: "Songhor/Soba" },
            { id: "tinderet_ward", name: "Tinderet" },
            { id: "chemelil_chemase", name: "Chemelil/Chemase" },
            { id: "kapsimotwo", name: "Kapsimotwo" },
          ],
        },
      ],
    },
    {
      id: "narok",
      name: "Narok",
      constituencies: [
        {
          id: "kilgoris",
          name: "Kilgoris",
          wards: [
            { id: "kilgoris_central", name: "Kilgoris Central" },
            { id: "keyian", name: "Keyian" },
            { id: "angata_barikoi", name: "Angata Barikoi" },
            { id: "shankoe", name: "Shankoe" },
            { id: "kimintet", name: "Kimintet" },
            { id: "lolgorian", name: "Lolgorian" },
          ],
        },
        {
          id: "emurua_dikirr",
          name: "Emurua Dikirr",
          wards: [
            { id: "ilkerin", name: "Ilkerin" },
            { id: "ololmasani", name: "Ololmasani" },
            { id: "mogondo", name: "Mogondo" },
            { id: "kapsasian", name: "Kapsasian" },
          ],
        },
        {
          id: "narok_north",
          name: "Narok North",
          wards: [
            { id: "olpusimoru", name: "Olposimoru" },
            { id: "olokurto", name: "Olokurto" },
            { id: "narok_town", name: "Narok Town" },
            { id: "nkareta", name: "Nkareta" },
            { id: "olorropil", name: "Olorropil" },
            { id: "melili", name: "Melili" },
          ],
        },
        {
          id: "narok_east",
          name: "Narok East",
          wards: [
            { id: "mosiro", name: "Mosiro" },
            { id: "ildamat", name: "Ildamat" },
            { id: "keekonyokie", name: "Keekonyokie" },
            { id: "suswa", name: "Suswa" },
          ],
        },
        {
          id: "narok_south",
          name: "Narok South",
          wards: [
            { id: "maji_moto_naroosura", name: "Maji Moto/Naroosura" },
            { id: "ololulunga", name: "Ololulung'a" },
            { id: "melelo", name: "Melelo" },
            { id: "loita", name: "Loita" },
            { id: "sogoo", name: "Sogoo" },
            { id: "sagamian", name: "Sagamian" },
          ],
        },
        {
          id: "narok_west",
          name: "Narok West",
          wards: [
            { id: "ilmotiook", name: "Ilmotiok" },
            { id: "mara", name: "Mara" },
            { id: "siana", name: "Siana" },
            { id: "naikarra", name: "Naikarra" },
          ],
        },
      ],
    },
    {
      id: "nyamira",
      name: "Nyamira",
      constituencies: [
        {
          id: "kitutu_masaba",
          name: "Kitutu Masaba",
          wards: [
            { id: "gachuba", name: "Gachuba" },
            { id: "kitutu_masaba", name: "Kitutu Masaba" },
            { id: "manga", name: "Manga" },
            { id: "kemera", name: "Kemera" },
            { id: "nyamira_central", name: "Nyamira Central" },
            { id: "bogetenga", name: "Bogetenga" },
          ],
        },
        {
          id: "north_mugirango",
          name: "North Mugirango",
          wards: [
            { id: "bomwagamo", name: "Bomwagamo" },
            { id: "bosamaro", name: "Bosamaro" },
            { id: "ebocho", name: "Ebocho" },
            { id: "bokeira", name: "Bokeira" },
            { id: "nyamusi", name: "Nyamusi" },
          ],
        },
        {
          id: "west_mugirango",
          name: "West Mugirango",
          wards: [
            { id: "ntunene", name: "Nyamaiya" },
            { id: "bogichora", name: "Bogichora" },
            { id: "bonyamatuta", name: "Bonyamatuta" },
            { id: "bokeira", name: "Bokeira" },
          ],
        },
        {
          id: "borabu",
          name: "Borabu",
          wards: [
            { id: "nyansiongo", name: "Nyansiongo" },
            { id: "sameta_mukirimo", name: "Sameta/Mukirimo" },
            { id: "kiabonyoru", name: "Kiabonyoru" },
            { id: "rinyo", name: "Rinyo" },
          ],
        },
      ],
    },
    {
      id: "nyandarua",
      name: "Nyandarua",
      constituencies: [
        {
          id: "kinangop",
          name: "Kinangop",
          wards: [
            { id: "engineer", name: "Engineer" },
            { id: "gathara", name: "Gathara" },
            { id: "north_kinangop", name: "North Kinangop" },
            { id: "murungaru", name: "Murungaru" },
            { id: "njabini_kiburu", name: "Njabini/Kiburu" },
            { id: "nyakio", name: "Nyakio" },
            { id: "githabai", name: "Githabai" },
            { id: "magumu", name: "Magumu" },
          ],
        },
        {
          id: "kipipiri",
          name: "Kipipiri",
          wards: [
            { id: "wanjohi", name: "Wanjohi" },
            { id: "kipipiri_ward", name: "Kipipiri" },
            { id: "geta", name: "Geta" },
            { id: "githioro", name: "Githioro" },
          ],
        },
        {
          id: "ol_kalou",
          name: "Ol Kalou",
          wards: [
            { id: "karau", name: "Karau" },
            { id: "kanjuiri_range", name: "Kanjuiri Range" },
            { id: "mirangine", name: "Mirangine" },
            { id: "kaimbaga", name: "Kaimbaga" },
            { id: "rurii", name: "Rurii" },
          ],
        },
        {
          id: "ol_jorok",
          name: "Ol Jorok",
          wards: [
            { id: "gathanji", name: "Gathanji" },
            { id: "gatimu", name: "Gatimu" },
            { id: "weru", name: "Weru" },
            { id: "charagita", name: "Charagita" },
          ],
        },
        {
          id: "ndaragwa",
          name: "Ndaragwa",
          wards: [
            { id: "leshau_pondo", name: "Leshau/Pondo" },
            { id: "kiriita", name: "Kiriita" },
            { id: "central_ndaragwa", name: "Central" },
            { id: "shamata", name: "Shamata" },
          ],
        },
      ],
    },
    {
      id: "nyeri",
      name: "Nyeri",
      constituencies: [
        {
          id: "tetu",
          name: "Tetu",
          wards: [
            { id: "dedan_kimathi", name: "Dedan Kimathi" },
            { id: "wamagana", name: "Wamagana" },
            { id: "aguthi_gaaki", name: "Aguthi-Gaaki" },
          ],
        },
        {
          id: "kieni",
          name: "Kieni",
          wards: [
            { id: "mweiga", name: "Mweiga" },
            { id: "naromoru_kiamathaga", name: "Naromoro/Kiamathaga" },
            { id: "mwiyogo_endara_sha", name: "Mwiyogo/Endarasha" },
            { id: "mugunda", name: "Mugunda" },
            { id: "gatarakwa", name: "Gatarakwa" },
            { id: "thegu_river", name: "Thegu River" },
            { id: "kabaru", name: "Kabaru" },
            { id: "gakawa", name: "Gakawa" },
          ],
        },
        {
          id: "mathira",
          name: "Mathira",
          wards: [
            { id: "ruguru", name: "Ruguru" },
            { id: "magutu", name: "Magutu" },
            { id: "iriaini", name: "Iriaini" },
            { id: "konyu", name: "Konyu" },
            { id: "kirimukuyu", name: "Kirimukuyu" },
            { id: "karatina_town", name: "Karatina Town" },
          ],
        },
        {
          id: "othaya",
          name: "Othaya",
          wards: [
            { id: "mahiga", name: "Mahiga" },
            { id: "iria_ini", name: "Iria-Ini" },
            { id: "chinga", name: "Chinga" },
            { id: "karima", name: "Karima" },
          ],
        },
        {
          id: "mukurweini",
          name: "Mukurweini",
          wards: [
            { id: "gikondi", name: "Gikondi" },
            { id: "rugi", name: "Rugi" },
            { id: "mukurwe_ini_west", name: "Mukurweini West" },
            { id: "mukurwe_ini_central", name: "Mukurweini Central" },
          ],
        },
        {
          id: "nyeri_town",
          name: "Nyeri Town",
          wards: [
            { id: "kiganjo_mathari", name: "Kiganjo/Mathari" },
            { id: "rware", name: "Rware" },
            { id: "gatitu_muruguru", name: "Gatitu/Muruguru" },
            { id: "ruring_u", name: "Ruring'u" },
            { id: "kamakwa_mukaro", name: "Kamakwa/Mukaro" },
          ],
        },
      ],
    },
    {
      id: "samburu",
      name: "Samburu",
      constituencies: [
        {
          id: "samburu_east",
          name: "Samburu East",
          wards: [
            { id: "wagalla", name: "Wagalla" },
            { id: "ndoto", name: "Ndoto" },
            { id: "marti", name: "Marti" },
            { id: "lodokejek", name: "Lodokejek" },
            { id: "wamba_west", name: "Wamba West" },
          ],
        },
        {
          id: "samburu_north",
          name: "Samburu North",
          wards: [
            { id: "baragoi", name: "Baragoi" },
            { id: "nyiro", name: "Nyiro" },
            { id: "el_barta", name: "El Barta" },
            { id: "suyian", name: "Suyian" },
            { id: "koch_kocho", name: "Koch Kocho" },
          ],
        },
        {
          id: "samburu_west",
          name: "Samburu West",
          wards: [
            { id: "lorroki", name: "Lorroki" },
            { id: "maralal_township", name: "Maralal Township" },
            { id: "loosen", name: "Loosuk" },
            { id: "porro", name: "Porro" },
            { id: "west_gate", name: "West Gate" },
          ],
        },
      ],
    },
    {
      id: "siaya",
      name: "Siaya",
      constituencies: [
        {
          id: "ugenya",
          name: "Ugenya",
          wards: [
            { id: "west_ugenya", name: "West Ugenya" },
            { id: "ukwala", name: "Ukwala" },
            { id: "north_ugenya", name: "North Ugenya" },
            { id: "east_ugenya", name: "East Ugenya" },
          ],
        },
        {
          id: "ugunja",
          name: "Ugunja",
          wards: [
            { id: "sidindi", name: "Sidindi" },
            { id: "sigomere", name: "Sigomere" },
            { id: "ugunja_ward", name: "Ugunja" },
          ],
        },
        {
          id: "alego_usonga",
          name: "Alego Usonga",
          wards: [
            { id: "usonga", name: "Usonga" },
            { id: "west_alego", name: "West Alego" },
            { id: "central_alego", name: "Central Alego" },
            { id: "siaya_township", name: "Siaya Township" },
            { id: "north_alego", name: "North Alego" },
            { id: "south_east_alego", name: "South East Alego" },
          ],
        },
        {
          id: "gem",
          name: "Gem",
          wards: [
            { id: "north_gem", name: "North Gem" },
            { id: "west_gem", name: "West Gem" },
            { id: "central_gem", name: "Central Gem" },
            { id: "yala_township", name: "Yala Township" },
            { id: "east_gem", name: "East Gem" },
            { id: "south_gem", name: "South Gem" },
          ],
        },
        {
          id: "bondo",
          name: "Bondo",
          wards: [
            { id: "west_yimbo", name: "West Yimbo" },
            { id: "central_sakwa", name: "Central Sakwa" },
            { id: "south_sakwa", name: "South Sakwa" },
            { id: "yimbo_east", name: "Yimbo East" },
            { id: "west_sakwa", name: "West Sakwa" },
            { id: "north_sakwa", name: "North Sakwa" },
          ],
        },
        {
          id: "rarieda",
          name: "Rarieda",
          wards: [
            { id: "east_asembo", name: "East Asembo" },
            { id: "west_asembo", name: "West Asembo" },
            { id: "north_uyoma", name: "North Uyoma" },
            { id: "south_uyoma", name: "South Uyoma" },
            { id: "west_uyoma", name: "West Uyoma" },
          ],
        },
      ],
    },
    {
      id: "taita_taveta",
      name: "Taita-Taveta",
      constituencies: [
        {
          id: "taveta",
          name: "Taveta",
          wards: [
            { id: "bomeni", name: "Bomeni" },
            { id: "mahoo", name: "Mahoo" },
            { id: "mboghoni", name: "Mboghoni" },
            { id: "mata", name: "Mata" },
            { id: "challa", name: "Challa" },
          ],
        },
        {
          id: "wundanyi",
          name: "Wundanyi",
          wards: [
            { id: "wundanyi_mabomani", name: "Wundanyi/Mbale" },
            { id: "werugha", name: "Wumingu/Bura" },
            { id: "mizima", name: "Mwanda/Mgange" },
            { id: "kitobo", name: "Ronge Juu" },
          ],
        },
        {
          id: "mwatate",
          name: "Mwatate",
          wards: [
            { id: "mwatate_ward", name: "Mwatate" },
            { id: "ronge_juu", name: "Ronge Juu" },
            { id: "bura", name: "Bura" },
            { id: "chawia", name: "Chawia" },
            { id: "wusi_kishamba", name: "Wusi/Kishamba" },
          ],
        },
        {
          id: "v/vo",
          name: "Voi",
          wards: [
            { id: "kasigau", name: "Kasigau" },
            { id: "sagalla", name: "Sagalla" },
            { id: "marungu", name: "Marungu" },
            { id: "kaloleni", name: "Kaloleni" },
            { id: "v/vo_township", name: "Voi Township" },
          ],
        },
      ],
    },
    {
      id: "tana_river",
      name: "Tana River",
      constituencies: [
        {
          id: "garsen",
          name: "Garsen",
          wards: [
            { id: "kipini_east", name: "Kipini East" },
            { id: "garsen_south", name: "Garsen South" },
            { id: "kipini_west", name: "Kipini West" },
            { id: "garsen_central", name: "Garsen Central" },
            { id: "garsen_west", name: "Garsen West" },
            { id: "garsen_north", name: "Garsen North" },
          ],
        },
        {
          id: "galole",
          name: "Galole",
          wards: [
            { id: "kinakomba", name: "Kinakomba" },
            { id: "mikinduni", name: "Mikinduni" },
            { id: "chewani", name: "Chewani" },
            { id: "wayu", name: "Wayu" },
          ],
        },
        {
          id: "bura_tana_river",
          name: "Bura",
          wards: [
            { id: "chewele", name: "Chewele" },
            { id: "hirimani", name: "Hirimani" },
            { id: "bangale", name: "Bangale" },
            { id: "sala", name: "Sala" },
            { id: "madogo", name: "Madogo" },
          ],
        },
      ],
    },

    {
      id: "tharaka_nithi",
      name: "Tharaka-Nithi",
      constituencies: [
        {
          id: "tharaka",
          name: "Tharaka",
          wards: [
            { id: "mukothima", name: "Mukothima" },
            { id: "chiakariga", name: "Chiakariga" },
            { id: "nkondi", name: "Nkondi" },
            { id: "marimanti", name: "Marimanti" },
            { id: "gatunga", name: "Gatunga" },
          ],
        },
        {
          id: "chuka_igambangombe",
          name: "Chuka/Igambang'ombe",
          wards: [
            { id: "magumoni", name: "Magumoni" },
            { id: "igambangombe", name: "Igambang'ombe" },
            { id: "mugwe", name: "Mugwe" },
            { id: "mariani", name: "Mariani" },
            { id: "karingani", name: "Karingani" },
          ],
        },
        {
          id: "maara",
          name: "Maara",
          wards: [
            { id: "mitheru", name: "Mitheru" },
            { id: "muthambi", name: "Muthambi" },
            { id: "ganga", name: "Ganga" },
            { id: "chogoria", name: "Chogoria" },
            { id: "mwimbi", name: "Mwimbi" },
          ],
        },
      ],
    },
    {
      id: "trans_nzoia",
      name: "Trans Nzoia",
      constituencies: [
        {
          id: "kwanza",
          name: "Kwanza",
          wards: [
            { id: "kapomboi", name: "Kapomboi" },
            { id: "kwanza_ward", name: "Kwanza" },
            { id: "keiyo", name: "Keiyo" },
            { id: "bidii", name: "Bidii" },
          ],
        },
        {
          id: "endebess",
          name: "Endebess",
          wards: [
            { id: "chepchoina", name: "Chepchoina" },
            { id: "endebess_ward", name: "Endebess" },
            { id: "matumbei", name: "Matumbei" },
          ],
        },
        {
          id: "saboti",
          name: "Saboti",
          wards: [
            { id: "kinyoro", name: "Kinyoro" },
            { id: "matisi", name: "Matisi" },
            { id: "tuwani", name: "Tuwani" },
            { id: "saboti_ward", name: "Saboti" },
            { id: "machewa", name: "Machewa" },
          ],
        },
        {
          id: "kiminini",
          name: "Kiminini",
          wards: [
            { id: "kiminini_ward", name: "Kiminini" },
            { id: "waitaluk", name: "Waitaluk" },
            { id: "sirende", name: "Sirende" },
            { id: "hospital", name: "Hospital" },
            { id: "sikhendu", name: "Sikhendu" },
            { id: "nabiswa", name: "Nabiswa" },
          ],
        },
        {
          id: "cherangany",
          name: "Cherangany",
          wards: [
            { id: "sinyerere", name: "Sinyerere" },
            { id: "makutano_t", name: "Makutano" },
            { id: "kaplamai", name: "Kaplamai" },
            { id: "motosiet", name: "Motosiet" },
            { id: "cherangany_suwerwa", name: "Cherangany/ Suwerwa" },
            { id: "chepsiro_kiptoror", name: "Chepsiro/ Kiptoror" },
            { id: "sitatunga", name: "Sitatunga" },
          ],
        },
      ],
    },
    {
      id: "turkana",
      name: "Turkana",
      constituencies: [
        {
          id: "turkana_north",
          name: "Turkana North",
          wards: [
            { id: "kaeris", name: "Kaeris" },
            { id: "lakezone", name: "Lakezone" },
            { id: "lapur", name: "Lapur" },
            { id: "kaaleng_kaikor", name: "Kaaleng/Kaikor" },
            { id: "kibish", name: "Kibish" },
            { id: "nakalale", name: "Nakalale" },
          ],
        },
        {
          id: "turkana_west",
          name: "Turkana West",
          wards: [
            { id: "kakuma", name: "Kakuma" },
            { id: "lopur", name: "Lopur" },
            { id: "letea", name: "Letea" },
            { id: "songot", name: "Songot" },
            { id: "kalobeyei", name: "Kalobeyei" },
            { id: "lokichoggio", name: "Lokichoggio" },
            { id: "nanaam", name: "Nanaam" },
          ],
        },
        {
          id: "turkana_central",
          name: "Turkana Central",
          wards: [
            { id: "kerio_delta", name: "Kerio Delta" },
            { id: "kangathota", name: "Kang'atotha" },
            { id: "kalokol", name: "Kalokol" },
            { id: "lodwar_township", name: "Lodwar Township" },
            { id: "kanamkemer", name: "Kanamkemer" },
          ],
        },
        {
          id: "loima",
          name: "Loima",
          wards: [
            { id: "kotaruk_lobei", name: "Kotaruk /Lobei" },
            { id: "turkwel", name: "Turkwel" },
            { id: "loima_ward", name: "Loima" },
            { id: "lokiriama_lorengippi", name: "Lokiriama/Loren Gippi" },
          ],
        },
        {
          id: "turkana_south",
          name: "Turkana South",
          wards: [
            { id: "kaputir", name: "Kaputir" },
            { id: "katilu", name: "Katilu" },
            { id: "lobokat", name: "Lobokat" },
            { id: "kalapata", name: "Kalapata" },
            { id: "lokichar", name: "Lokichar" },
          ],
        },
        {
          id: "turkana_east",
          name: "Turkana East",
          wards: [
            { id: "kapedo_napeitom", name: "Kapedo/Napeito M" },
            { id: "katilia", name: "Katilia" },
            { id: "lokori_kochodin", name: "Lokori/Kochodin" },
          ],
        },
      ],
    },
    {
      id: "uasin_gishu",
      name: "Uasin Gishu",
      constituencies: [
        {
          id: "soy",
          name: "Soy",
          wards: [
            { id: "mois_bridge", name: "Moi's Bridge" },
            { id: "kapkures", name: "Kapkures" },
            { id: "ziwa", name: "Ziwa" },
            { id: "segero_barsombe", name: "Segero/ Barsombe" },
            { id: "kipsomba", name: "Kipsomba" },
            { id: "soy_ward", name: "Soy" },
            { id: "kuinet_kapsuswa", name: "Kuinet/ Kapsuswa" },
          ],
        },
        {
          id: "turbo",
          name: "Turbo",
          wards: [
            { id: "ngenyilel", name: "Ngenyilel" },
            { id: "tapsagoi", name: "Tapsagoi" },
            { id: "kamagut", name: "Kamagut" },
            { id: "kiplombe", name: "Kiplombe" },
            { id: "kapsaos", name: "Kapsaos" },
            { id: "huruma", name: "Huruma" },
          ],
        },
        {
          id: "moiben",
          name: "Moiben",
          wards: [
            { id: "tembelio", name: "Tembelio" },
            { id: "sergoit", name: "Sergoit" },
            { id: "karuna_meibeki", name: "Karuna/Meibeki" },
            { id: "moiben_ward", name: "Moiben" },
            { id: "kimumu", name: "Kimumu" },
          ],
        },
        {
          id: "ainabkoi",
          name: "Ainabkoi",
          wards: [
            { id: "kapsoya", name: "Kapsoya" },
            { id: "kaptagat", name: "Kaptagat" },
            { id: "ainabkoi_olare", name: "Ainabkoi/Olare" },
          ],
        },
        {
          id: "kapseret",
          name: "Kapseret",
          wards: [
            { id: "simat_kapseret", name: "Simat/Kapseret" },
            { id: "kipkenyo", name: "Kipkenyo" },
            { id: "ngeria", name: "Ngeria" },
            { id: "megun", name: "Megun" },
            { id: "langas", name: "Langas" },
          ],
        },
        {
          id: "kesses",
          name: "Kesses",
          wards: [
            { id: "racecourse", name: "Racecourse" },
            { id: "cheptiret_kipchamo", name: "Cheptiret/ Kipchamo" },
            { id: "tulwet_chuiyat", name: "Tulwet/Chuiyat" },
            { id: "tarakwa", name: "Tarakwa" },
          ],
        },
      ],
    },
    {
      id: "vihiga",
      name: "Vihiga",
      constituencies: [
        {
          id: "vihiga_constituency",
          name: "Vihiga",
          wards: [
            { id: "central_maragoli", name: "Central Maragoli" },
            { id: "mungoma", name: "Mungoma" },
            { id: "wodiya", name: "Wodiya" },
            { id: "north_maragoli", name: "North Maragoli" },
            { id: "south_maragoli", name: "South Maragoli" },
          ],
        },
        {
          id: "emuhaya",
          name: "Emuhaya",
          wards: [
            { id: "central_emuhaya", name: "Central Emuhaya" },
            { id: "east_emuhaya", name: "East Emuhaya" },
            { id: "west_emuhaya", name: "West Emuhaya" },
            { id: "north_emuhaya", name: "North Emuhaya" },
          ],
        },
        {
          id: "sabatia",
          name: "Sabatia",
          wards: [
            { id: "lyaduywa_izava", name: "Lyaduywa/Izava" },
            { id: "sabatia_west", name: "Sabatia West" },
            { id: "chavakali", name: "Chavakali" },
            { id: "sabatia_north", name: "Sabatia North" },
            { id: "sabatia_east", name: "Sabatia East" },
          ],
        },
        {
          id: "hamisi",
          name: "Hamisi",
          wards: [
            { id: "shirumbira", name: "Shirumbira" },
            { id: "gisambai", name: "Gisambai" },
            { id: "shamakhokho", name: "Shamakhokho" },
            { id: "bunda", name: "Bunda" },
            { id: "jekonye", name: "Jekonye" },
          ],
        },
        {
          id: "luanda",
          name: "Luanda",
          wards: [
            { id: "luanda_township", name: "Luanda Township" },
            { id: "luanda_north", name: "Luanda North" },
            { id: "luanda_south", name: "Luanda South" },
            { id: "luanda_central", name: "Luanda Central" },
            { id: "luanda_west", name: "Luanda West" },
          ],
        },
      ],
    },
    {
      id: "wajir",
      name: "Wajir",
      constituencies: [
        {
          id: "wajir_north",
          name: "Wajir North",
          wards: [
            { id: "gurar", name: "Gurar" },
            { id: "bute", name: "Bute" },
            { id: "korondile", name: "Korondile" },
            { id: "malkagufu", name: "Malkagufu" },
            { id: "batalu", name: "Batalu" },
            { id: "danaba", name: "Danaba" },
            { id: "godoma", name: "Godoma" },
          ],
        },
        {
          id: "wajir_east",
          name: "Wajir East",
          wards: [
            { id: "wagberi", name: "Wagberi" },
            { id: "township_wajir", name: "Township" },
            { id: "barwago", name: "Barwago" },
            { id: "khorof_harar", name: "Khorof/Harar" },
          ],
        },
        {
          id: "tarbaj",
          name: "Tarbaj",
          wards: [
            { id: "elben", name: "Elben" },
            { id: "sarman", name: "Sarman" },
            { id: "tarbaj_ward", name: "Tarbaj" },
            { id: "wargadud_wajir", name: "Wargadud" },
          ],
        },
        {
          id: "wajir_west",
          name: "Wajir West",
          wards: [
            { id: "arbajahan", name: "Arbajahan" },
            { id: "hadado_athibohol", name: "Hadado/ Athibohol" },
            { id: "ademasajide", name: "Ademasajide" },
            { id: "ganyure", name: "Ganyure" },
            { id: "wagalla_wajir", name: "Wagalla" },
          ],
        },
        {
          id: "eldas",
          name: "Eldas",
          wards: [
            { id: "eldas_ward", name: "Eldas" },
            { id: "della", name: "Della" },
            { id: "lakoley_south_basir", name: "Lakoley South/Basir" },
            { id: "elnur_tula_tula", name: "Elnur/Tula Tula" },
          ],
        },
        {
          id: "wajir_south",
          name: "Wajir South",
          wards: [
            { id: "benane", name: "Benane" },
            { id: "burder", name: "Burder" },
            { id: "dadaja_bulla", name: "Dadaja Bulla" },
            { id: "habaswein", name: "Habaswein" },
            { id: "lagboghol_south", name: "Lagboghol South" },
            { id: "ibrahim_ure", name: "Ibrahim Ure" },
          ],
        },
      ],
    },
    {
      id: "west_pokot",
      name: "West Pokot",
      constituencies: [
        {
          id: "kapenguria",
          name: "Kapenguria",
          wards: [
            { id: "riwo", name: "Riwo" },
            { id: "kapenguria_ward", name: "Kapenguria" },
            { id: "mnagei", name: "Mnagei" },
            { id: "siyoi", name: "Siyoi" },
            { id: "endugh", name: "Endugh" },
            { id: "sook", name: "Sook" },
          ],
        },
        {
          id: "sigor",
          name: "Sigor",
          wards: [
            { id: "sekerr", name: "Sekerr" },
            { id: "masool", name: "Masool" },
            { id: "lomut", name: "Lomut" },
            { id: "wei_wei", name: "Wei Wei" },
          ],
        },
        {
          id: "kacheliba",
          name: "Kacheliba",
          wards: [
            { id: "suam", name: "Suam" },
            { id: "kodich", name: "Kodich" },
            { id: "kasei", name: "Kasei" },
            { id: "kapchok", name: "Kapchok" },
            { id: "kiwawa", name: "Kiwawa" },
            { id: "alale", name: "Alale" },
          ],
        },
        {
          id: "pokot_south",
          name: "Pokot South",
          wards: [
            { id: "chepareria", name: "Chepareria" },
            { id: "batei", name: "Batei" },
            { id: "lelan", name: "Lelan" },
            { id: "tapach", name: "Tapach" },
          ],
        },
      ],
    },
  ],
};
