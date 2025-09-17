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
  ],
};
