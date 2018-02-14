function addressFunc (form) {
    document.getElementById("loader").style.display = "block"; //show loader
        
    var streetIN = form.elements[0].value;
    var cityIN = form.elements[1].value;
    var stateIN = form.elements[2].value;
    var zipIN = form.elements[3].value;
    
    if(streetIN == '' || cityIN == '' || stateIN == '' || zipIN == ''){
        swal('Please fill in all address fields');
        document.getElementById("loader").style.display = "none"; //hide loader
    }
    
    var fullAddress = streetIN + cityIN + stateIN + zipIN
    fullAddress = fullAddress.replace(/ /g,'%20'); //needed for google civiv api
    
    getDist(fullAddress, 'adrs');
}

function geoLocateFunc(){
    document.getElementById("loader").style.display = "block"; //show loader
    
    var p = new Promise(function(resolve, reject) {
        navigator.geolocation.getCurrentPosition(function(position){
            resolve(position);
        });
    })

    p.then((resolved) => {
        getDist(resolved,'geo');
    })
}

function preBuild(){
    //struc dist paths under each state
    var distListURL = "https://api.github.com/repos/unitedstates/districts/contents/cds/2016?ref=gh-pages";
        
    var p3 = new Promise(function(resolve, reject) {
        $.get(distListURL, function(response) {
            resolve(response);
        })
    })

    var stateABRV = {
        AL: {name:'Alabama', cds:[], Senators:[]}, //, Congressmen:[], stateSenators:[]} ], 
        AK: {name:'Alaska',  cds:[], Senators:[]},
        AZ: {name:'Arizona',  cds:[], Senators:[]},
        AR: {name:'Arkansas',  cds:[], Senators:[]},
        CA: {name:'California',  cds:[], Senators:[]},
        CO: {name:'Colorado',  cds:[], Senators:[]},
        CT: {name:'Connecticut',  cds:[], Senators:[]},
        DE: {name:'Delaware',  cds:[], Senators:[]},
        FL: {name:'Florida',  cds:[], Senators:[]},
        GA: {name:'Georgia',  cds:[], Senators:[]},
        HI: {name:'Hawaii',  cds:[], Senators:[]},
        ID: {name:'Idaho',  cds:[], Senators:[]},
        IL: {name:'Illinois',  cds:[], Senators:[]},
        IN: {name:'Indiana',  cds:[], Senators:[]},
        IA: {name:'Iowa',  cds:[], Senators:[]},
        KS: {name:'Kansas',  cds:[], Senators:[]},
        KY: {name:'Kentucky',  cds:[], Senators:[]},
        LA: {name:'Louisiana',  cds:[], Senators:[]},
        ME: {name:'Maine',  cds:[], Senators:[]},
        MD: {name:'Maryland',  cds:[], Senators:[]},
        MA: {name:'Massachusetts',  cds:[], Senators:[]},
        MI: {name:'Michigan',  cds:[], Senators:[]},
        MN: {name:'Minnesota',  cds:[], Senators:[]},
        MS: {name:'Mississippi',  cds:[], Senators:[]},
        MO: {name:'Missouri',  cds:[], Senators:[]},
        MT: {name:'Montana',  cds:[], Senators:[]},
        NE: {name:'Nebraska',  cds:[], Senators:[]},
        NV: {name:'Nevada',  cds:[], Senators:[]},
        NH: {name:'New Hampshire',  cds:[], Senators:[]},
        NJ: {name:'New Jersey',  cds:[], Senators:[]},
        NM: {name:'New Mexico',  cds:[], Senators:[]},
        NY: {name:'New York',  cds:[], Senators:[]},
        NC: {name:'North Carolina',  cds:[], Senators:[]},
        ND: {name:'North Dakota',  cds:[], Senators:[]},
        OH: {name:'Ohio',  cds:[], Senators:[]},
        OK: {name:'Oklahoma',  cds:[], Senators:[]},
        OR: {name:'Oregon',  cds:[], Senators:[]},
        PA: {name:'Pennsylvania',  cds:[], Senators:[]},
        RI: {name:'Rhode Island',  cds:[], Senators:[]},
        SC: {name:'South Carolina',  cds:[], Senators:[]},
        SD: {name:'South Dakota',  cds:[], Senators:[]},
        TN: {name:'Tennessee',  cds:[], Senators:[]},
        TX: {name:'Texas',  cds:[], Senators:[]},
        UT: {name:'Utah',  cds:[], Senators:[]},
        VT: {name:'Vermont',  cds:[], Senators:[]},
        VA: {name:'Virginia',  cds:[], Senators:[]},
        WA: {name:'Washington',  cds:[], Senators:[]},
        WV: {name:'West Virginia',  cds:[], Senators:[]},
        WI: {name:'Wisconsin',  cds:[], Senators:[]},
        WY: {name:'Wyoming', cds:[], Senators:[]} 
               }

    p3.then((resolved3) => {
        for (obj in resolved3) {
            var distName = resolved3[obj].name;
            var distState = distName.replace(/-\d{1,}/g, "")
            stateABRV[distState]['cds'].push(distName); //push cong dists into stateABRV
        }
        this.DISTLIST = stateABRV; //move stateABRV into scope for later
    })
}

function javascript_abort(){throw new Error('This is not an error. This is just to abort javascript')}

function getDist(position, which1){

        var p = new Promise(function(resolve, reject) {
            if(which1 == 'geo'){
                var lat = position.coords.latitude;
                var lng = position.coords.longitude;

                var address = "https://maps.google.com/maps/api/geocode/json?latlng=" + lat + ',' + lng;

                $.get(address, function(response) {
                    var fullAddress = response['results'][0]['formatted_address'];
                    fullAddress = fullAddress.replace(/ /g,'%20'); //needed for google civiv api
                    resolve(fullAddress);
                })
            }
            if(which1 == 'adrs'){
                resolve(position);
            }
        })
        
        p.then((resolved) => {
            var ggleCivic = "https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyB8GawykpqPHCYiMNSk06tWAqYFRW-4XTk&address=";
            
            
            document.getElementById("loader").style.display = "none"; //hide loader            
            console.log(resolved);
            
        })
        
                
        
        
//        
//        
//
//    {
// "kind": "civicinfo#representativeInfoResponse",
// "normalizedInput": {
//  "line1": "325 Pleasant Street",
//  "city": "Concord",
//  "state": "NH",
//  "zip": "03301"
// },
// "divisions": {
//  "ocd-division/country:us": {
//   "name": "United States",
//   "officeIndices": [
//    0,
//    1
//   ]
//  },
//  "ocd-division/country:us/state:nh": {
//   "name": "New Hampshire",
//   "officeIndices": [
//    2,
//    4,
//    7,
//    8,
//    9,
//    10,
//    11
//   ]
//  },
//  "ocd-division/country:us/state:nh/cd:2": {
//   "name": "New Hampshire's 2nd congressional district",
//   "officeIndices": [
//    3
//   ]
//  },
//  "ocd-division/country:us/state:nh/county:merrimack": {
//   "name": "Merrimack County",
//   "officeIndices": [
//    12,
//    13,
//    14,
//    15,
//    16
//   ]
//  },
//  "ocd-division/country:us/state:nh/executive_district:2": {
//   "name": "New Hampshire Executive Council District 2"
//  },
//  "ocd-division/country:us/state:nh/place:concord": {
//   "name": "Concord city"
//  },
//  "ocd-division/country:us/state:nh/place:concord/ward:5": {
//   "name": "Concord NH - Ward 5"
//  },
//  "ocd-division/country:us/state:nh/sldl:merrimack_10": {
//   "name": "New Hampshire State House district Merrimack County No. 10",
//   "officeIndices": [
//    6
//   ]
//  },
//  "ocd-division/country:us/state:nh/sldu:15": {
//   "name": "New Hampshire State Senate district 15",
//   "officeIndices": [
//    5
//   ]
//  }
// },
// "offices": [
//  {
//   "name": "President of the United States",
//   "divisionId": "ocd-division/country:us",
//   "levels": [
//    "country"
//   ],
//   "roles": [
//    "headOfState",
//    "headOfGovernment"
//   ],
//   "officialIndices": [
//    0
//   ]
//  }, //pres
//  {
//   "name": "Vice-President of the United States",
//   "divisionId": "ocd-division/country:us",
//   "levels": [
//    "country"
//   ],
//   "roles": [
//    "deputyHeadOfGovernment"
//   ],
//   "officialIndices": [
//    1
//   ]
//  }, //VP
//  {
//   "name": "United States Senate",
//   "divisionId": "ocd-division/country:us/state:nh",
//   "levels": [
//    "country"
//   ],
//   "roles": [
//    "legislatorUpperBody"
//   ],
//   "officialIndices": [
//    2,
//    3
//   ]
//  },
//  {
//   "name": "United States House of Representatives NH-02",
//   "divisionId": "ocd-division/country:us/state:nh/cd:2",
//   "levels": [
//    "country"
//   ],
//   "roles": [
//    "legislatorLowerBody"
//   ],
//   "officialIndices": [
//    4
//   ]
//  },
//  {
//   "name": "Governor",
//   "divisionId": "ocd-division/country:us/state:nh",
//   "levels": [
//    "administrativeArea1"
//   ],
//   "roles": [
//    "headOfGovernment"
//   ],
//   "officialIndices": [
//    5
//   ]
//  },
//  {
//   "name": "NH State Senate District 15",
//   "divisionId": "ocd-division/country:us/state:nh/sldu:15",
//   "levels": [
//    "administrativeArea1"
//   ],
//   "roles": [
//    "legislatorUpperBody"
//   ],
//   "officialIndices": [
//    6
//   ]
//  },
//  {
//   "name": "NH State House District Merrimack 10",
//   "divisionId": "ocd-division/country:us/state:nh/sldl:merrimack_10",
//   "levels": [
//    "administrativeArea1"
//   ],
//   "roles": [
//    "legislatorLowerBody"
//   ],
//   "officialIndices": [
//    7,
//    8,
//    9
//   ]
//  },
//  {
//   "name": "Executive Councilor, District 1",
//   "divisionId": "ocd-division/country:us/state:nh",
//   "officialIndices": [
//    10
//   ]
//  },
//  {
//   "name": "Executive Councilor, District 2",
//   "divisionId": "ocd-division/country:us/state:nh",
//   "officialIndices": [
//    11
//   ]
//  },
//  {
//   "name": "Executive Councilor, District 3",
//   "divisionId": "ocd-division/country:us/state:nh",
//   "officialIndices": [
//    12
//   ]
//  },
//  {
//   "name": "Executive Councilor, District 4",
//   "divisionId": "ocd-division/country:us/state:nh",
//   "officialIndices": [
//    13
//   ]
//  },
//  {
//   "name": "Executive Councilor, District 5",
//   "divisionId": "ocd-division/country:us/state:nh",
//   "officialIndices": [
//    14
//   ]
//  },
//  {
//   "name": "Sheriff",
//   "divisionId": "ocd-division/country:us/state:nh/county:merrimack",
//   "officialIndices": [
//    15
//   ]
//  },
//  {
//   "name": "Treasurer",
//   "divisionId": "ocd-division/country:us/state:nh/county:merrimack",
//   "officialIndices": [
//    16
//   ]
//  },
//  {
//   "name": "County Attorney",
//   "divisionId": "ocd-division/country:us/state:nh/county:merrimack",
//   "officialIndices": [
//    17
//   ]
//  },
//  {
//   "name": "Register of Deeds",
//   "divisionId": "ocd-division/country:us/state:nh/county:merrimack",
//   "officialIndices": [
//    18
//   ]
//  },
//  {
//   "name": "Register of Probate",
//   "divisionId": "ocd-division/country:us/state:nh/county:merrimack",
//   "officialIndices": [
//    19
//   ]
//  }
// ],
//     
//     
// "officials": [
//  {
//   "name": "Donald J. Trump",
//   "address": [
//    {
//     "line1": "The White House",
//     "line2": "1600 Pennsylvania Avenue NW",
//     "city": "Washington",
//     "state": "DC",
//     "zip": "20500"
//    }
//   ],
//   "party": "Republican",
//   "phones": [
//    "(202) 456-1111"
//   ],
//   "urls": [
//    "http://www.whitehouse.gov/"
//   ],
//   "photoUrl": "https://www.whitehouse.gov/sites/whitehouse.gov/files/images/45/PE%20Color.jpg",
//   "channels": [
//    {
//     "type": "GooglePlus",
//     "id": "+whitehouse"
//    },
//    {
//     "type": "Facebook",
//     "id": "whitehouse"
//    },
//    {
//     "type": "Twitter",
//     "id": "potus"
//    },
//    {
//     "type": "YouTube",
//     "id": "whitehouse"
//    }
//   ]
//  }, //pres
//  {
//   "name": "Mike Pence",
//   "address": [
//    {
//     "line1": "The White House",
//     "line2": "1600 Pennsylvania Avenue NW",
//     "city": "Washington",
//     "state": "DC",
//     "zip": "20500"
//    }
//   ],
//   "party": "Republican",
//   "phones": [
//    "(202) 456-1111"
//   ],
//   "urls": [
//    "http://www.whitehouse.gov/"
//   ],
//   "photoUrl": "https://www.whitehouse.gov/sites/whitehouse.gov/files/images/45/VPE%20Color.jpg",
//   "channels": [
//    {
//     "type": "GooglePlus",
//     "id": "+whitehouse"
//    },
//    {
//     "type": "Facebook",
//     "id": "whitehouse"
//    },
//    {
//     "type": "Twitter",
//     "id": "VP"
//    }
//   ]
//  }, //vp
//  {
//   "name": "Jeanne Shaheen",
//   "address": [
//    {
//     "line1": "506 Hart Senate Office Building",
//     "city": "Washington",
//     "state": "DC",
//     "zip": "20510"
//    }
//   ],
//   "party": "Democratic",
//   "phones": [
//    "(202) 224-2841"
//   ],
//   "urls": [
//    "https://www.shaheen.senate.gov/"
//   ],
//   "photoUrl": "http://bioguide.congress.gov/bioguide/photo/S/S001181.jpg",
//   "channels": [
//    {
//     "type": "Facebook",
//     "id": "SenatorShaheen"
//    },
//    {
//     "type": "Twitter",
//     "id": "SenatorShaheen"
//    },
//    {
//     "type": "YouTube",
//     "id": "senatorshaheen"
//    }
//   ]
//  },
//  {
//   "name": "Margaret Wood Hassan",
//   "address": [
//    {
//     "line1": "B85 Russell Senate Office Building",
//     "city": "Washington",
//     "state": "DC",
//     "zip": "20510"
//    }
//   ],
//   "party": "Democratic",
//   "phones": [
//    "(202) 224-3324"
//   ],
//   "urls": [
//    "https://www.hassan.senate.gov"
//   ],
//   "photoUrl": "https://www.hassan.senate.gov/sites/default/files/Maggie-Hassan-Official-Port.jpg",
//   "channels": [
//    {
//     "type": "Facebook",
//     "id": "SenatorHassan"
//    },
//    {
//     "type": "Twitter",
//     "id": "SenatorHassan"
//    },
//    {
//     "type": "YouTube",
//     "id": "SenatorHassan"
//    }
//   ]
//  },
//  {
//   "name": "Ann M. Kuster",
//   "address": [
//    {
//     "line1": "137 Cannon House Office Building",
//     "city": "Washington",
//     "state": "DC",
//     "zip": "20515"
//    }
//   ],
//   "party": "Democratic",
//   "phones": [
//    "(202) 225-5206"
//   ],
//   "urls": [
//    "http://kuster.house.gov/"
//   ],
//   "photoUrl": "http://bioguide.congress.gov/bioguide/photo/K/K000382.jpg",
//   "channels": [
//    {
//     "type": "Facebook",
//     "id": "CongresswomanAnnieKuster"
//    },
//    {
//     "type": "Twitter",
//     "id": "RepAnnieKuster"
//    },
//    {
//     "type": "YouTube",
//     "id": "RepKuster"
//    },
//    {
//     "type": "GooglePlus",
//     "id": "100919686477949525696"
//    }
//   ]
//  },
//  {
//   "name": "Chris Sununu",
//   "address": [
//    {
//     "line1": "Office of the Governor State House",
//     "line2": "107 North Main Street",
//     "city": "Concord",
//     "state": "NH",
//     "zip": "03301"
//    }
//   ],
//   "party": "Republican",
//   "phones": [
//    "(603) 271-2121"
//   ],
//   "urls": [
//    "http://www.governor.nh.gov/"
//   ],
//   "photoUrl": "http://www.governor.nh.gov/graphics/sununu.jpg",
//   "channels": [
//    {
//     "type": "Facebook",
//     "id": "GovernorChrisSununu"
//    },
//    {
//     "type": "Twitter",
//     "id": "GovChrisSununu"
//    },
//    {
//     "type": "YouTube",
//     "id": "UC5miBoplJbVV0Zt7NXNYWhQ"
//    }
//   ]
//  },
//  {
//   "name": "Dan Feltes",
//   "address": [
//    {
//     "line1": "33 N STATE ST",
//     "city": "Concord",
//     "state": "NH",
//     "zip": "03301"
//    }
//   ],
//   "party": "Democratic",
//   "phones": [
//    "(603) 271-3067"
//   ],
//   "urls": [
//    "http://www.gencourt.state.nh.us/Senate/members/webpages/district15.aspx"
//   ],
//   "photoUrl": "http://www.gencourt.state.nh.us/Senate/members/webpages/Senator%20Feltes.jpg",
//   "emails": [
//    "Dan.Feltes@leg.state.nh.us"
//   ],
//   "channels": [
//    {
//     "type": "Facebook",
//     "id": "DanFeltesNH"
//    },
//    {
//     "type": "Twitter",
//     "id": "danfeltesnh"
//    }
//   ]
//  },
//  {
//   "name": "Mel Myler",
//   "address": [
//    {
//     "line1": "PO BOX 82",
//     "city": "",
//     "state": "NH",
//     "zip": "03229"
//    }
//   ],
//   "party": "Democratic",
//   "phones": [
//    "(603) 746-5294"
//   ],
//   "urls": [
//    "http://www.gencourt.state.nh.us/house/members/member.aspx?member=377153"
//   ],
//   "photoUrl": "http://www.gencourt.state.nh.us/house/images/memberpics/377153.jpg",
//   "emails": [
//    "Mel.Myler@leg.state.nh.us"
//   ]
//  },
//  {
//   "name": "David Luneau",
//   "address": [
//    {
//     "line1": "211 PUTNEY HILL RD,",
//     "city": "Hopkinton",
//     "state": "NH",
//     "zip": "03229"
//    }
//   ],
//   "party": "Independent",
//   "phones": [
//    "(603) 661-0990"
//   ],
//   "urls": [
//    "http://www.gencourt.state.nh.us/house/members/member.aspx?member=377307"
//   ],
//   "photoUrl": "http://gencourt.state.nh.us/house/images/memberpics/377307.jpg",
//   "emails": [
//    "dluneauNH@gmail.com"
//   ]
//  },
//  {
//   "name": "Mary Jane Wallner",
//   "address": [
//    {
//     "line1": "4 CHESTNUT PASTURE RD,",
//     "city": "Concord",
//     "state": "NH",
//     "zip": "03301"
//    }
//   ],
//   "party": "Democratic",
//   "phones": [
//    "(603) 224-1632"
//   ],
//   "urls": [
//    "http://www.gencourt.state.nh.us/house/members/member.aspx?member=368423"
//   ],
//   "photoUrl": "http://www.gencourt.state.nh.us/house/images/memberpics/368423.jpg",
//   "emails": [
//    "Maryjane.Wallner@leg.state.nh.us"
//   ]
//  },
//  {
//   "name": "Joseph D. Kenney",
//   "address": [
//    {
//     "line1": "PO Box 201",
//     "city": "",
//     "state": "NH",
//     "zip": "03887"
//    }
//   ],
//   "party": "Republican",
//   "phones": [
//    "(603) 271-3632"
//   ],
//   "emails": [
//    "Joseph.Kenney@nh.gov"
//   ]
//  },
//  {
//   "name": "Andru Volinsky",
//   "address": [
//    {
//     "line1": "488 Shaker Road",
//     "city": "Concord",
//     "state": "NH",
//     "zip": "03301"
//    }
//   ],
//   "party": "Democratic",
//   "phones": [
//    "(603) 271-3632"
//   ],
//   "urls": [
//    "https://www.nh.gov/council/districts/d2/index.htm"
//   ],
//   "emails": [
//    "Andru.Volinsky@nh.gov"
//   ]
//  },
//  {
//   "name": "Russell Prescott",
//   "address": [
//    {
//     "line1": "50 Little River Road",
//     "city": "Kingston",
//     "state": "NH",
//     "zip": "03848"
//    }
//   ],
//   "party": "Republican",
//   "phones": [
//    "(603) 271-3632"
//   ],
//   "urls": [
//    "https://www.nh.gov/council/districts/d3/index.htm"
//   ],
//   "emails": [
//    "represcott@nh.gov"
//   ]
//  },
//  {
//   "name": "Christopher C. Pappas",
//   "address": [
//    {
//     "line1": "629 Kearney Circle",
//     "city": "Manchester",
//     "state": "NH",
//     "zip": "03104"
//    }
//   ],
//   "party": "Democratic",
//   "phones": [
//    "(603) 271-3632"
//   ],
//   "emails": [
//    "cpappas@nh.gov"
//   ]
//  },
//  {
//   "name": "Dave Wheeler",
//   "address": [
//    {
//     "line1": "22 Appletree Green",
//     "city": "Nashua",
//     "state": "NH",
//     "zip": "03062"
//    }
//   ],
//   "party": "Republican",
//   "phones": [
//    "(603) 271-3632"
//   ]
//  },
//  {
//   "name": "Scott Hilliard",
//   "address": [
//    {
//     "line1": "333 Daniel Webster Highway,",
//     "city": "Boscawen",
//     "state": "NH",
//     "zip": "03303"
//    }
//   ],
//   "party": "Republican",
//   "phones": [
//    "(603) 796-6600"
//   ],
//   "urls": [
//    "http://www.merrimackcountysheriff.org/"
//   ],
//   "channels": [
//    {
//     "type": "Facebook",
//     "id": "MerrimackCountySheriffsOffice"
//    },
//    {
//     "type": "Twitter",
//     "id": "MerrCtySheriff"
//    }
//   ]
//  },
//  {
//   "name": "Les Hammond",
//   "address": [
//    {
//     "line1": "333 Daniel Webster Highway,",
//     "city": "Boscawen",
//     "state": "NH",
//     "zip": "03303"
//    }
//   ],
//   "party": "Republican",
//   "phones": [
//    "(603) 796-6800"
//   ]
//  },
//  {
//   "name": "Scott W. Murray",
//   "address": [
//    {
//     "line1": "4 Court Street,",
//     "city": "Concord",
//     "state": "NH",
//     "zip": "03301"
//    }
//   ],
//   "party": "Republican",
//   "phones": [
//    "(603) 228-0529"
//   ],
//   "urls": [
//    "http://www.merrimackcounty.net/departments/county-attorney/11-county-attorney"
//   ],
//   "emails": [
//    "smurray@mcao.net"
//   ]
//  },
//  {
//   "name": "Kathi L. Guay",
//   "address": [
//    {
//     "line1": "P.O. Box 248",
//     "city": "Concord",
//     "state": "NH",
//     "zip": "03302"
//    }
//   ],
//   "party": "Republican",
//   "phones": [
//    "(603) 228-0101"
//   ],
//   "urls": [
//    "http://merrimackcountydeedsnh.com/"
//   ],
//   "emails": [
//    "merctydeed@gmail.com"
//   ],
//   "channels": [
//    {
//     "type": "Facebook",
//     "id": "104719886244742"
//    },
//    {
//     "type": "Twitter",
//     "id": "rockinghamco"
//    }
//   ]
//  },
//  {
//   "name": "Jane Bradstreet",
//   "party": "Republican"
//  }
// ]
//}    //ggle civic reps
//        
//        
//        
//        
//    
//    {
//        'results': [{
//            'address_components': [{
//                'long_name': '109',
//                'short_name': '109',
//                'types': ['street_number']
//            }, {
//                'long_name': 'Roberts Street North',
//                'short_name': 'Roberts St N',
//                'types': ['route']
//            }, {
//                'long_name': 'Downtown',
//                'short_name': 'Downtown',
//                'types': ['neighborhood', 'political']
//            }, {
//                'long_name': 'Fargo',
//                'short_name': 'Fargo',
//                'types': ['locality', 'political']
//            }, {
//                'long_name': 'Cass County',
//                'short_name': 'Cass County',
//                'types': ['administrative_area_level_2', 'political']
//            }, {
//                'long_name': 'North Dakota',
//                'short_name': 'ND',
//                'types': ['administrative_area_level_1', 'political']
//            }, {
//                'long_name': 'United States',
//                'short_name': 'US',
//                'types': ['country', 'political']
//            }, {
//                'long_name': '58102',
//                'short_name': '58102',
//                'types': ['postal_code']
//            }, {
//                'long_name': '4929',
//                'short_name': '4929',
//                'types': ['postal_code_suffix']
//            }],
//            'formatted_address': '109 Roberts St N, Fargo, ND 58102, USA',
//            'geometry': {
//                'location': {
//                    'lat': 46.8773692,
//                    'lng': -96.78948
//                },
//                'location_type': 'ROOFTOP',
//                'viewport': {
//                    'northeast': {
//                        'lat': 46.87871818029149,
//                        'lng': -96.7881310197085
//                    },
//                    'southwest': {
//                        'lat': 46.8760202197085,
//                        'lng': -96.79082898029151
//                    }
//                }
//            },
//            'place_id': 'ChIJ6TNlsGDJyFIR2RY_dsEZj48',
//            'types': ['street_address']
//        }, {
//            'address_components': [{
//                'long_name': 'LinkFM #08 - Federal Building (Detour)',
//                'short_name': 'LinkFM #08 - Federal Building (Detour)',
//                'types': ['bus_station', 'establishment', 'point_of_interest', 'transit_station']
//            }, {
//                'long_name': 'Downtown',
//                'short_name': 'Downtown',
//                'types': ['neighborhood', 'political']
//            }, {
//                'long_name': 'Fargo',
//                'short_name': 'Fargo',
//                'types': ['locality', 'political']
//            }, {
//                'long_name': 'Cass County',
//                'short_name': 'Cass County',
//                'types': ['administrative_area_level_2', 'political']
//            }, {
//                'long_name': 'North Dakota',
//                'short_name': 'ND',
//                'types': ['administrative_area_level_1', 'political']
//            }, {
//                'long_name': 'United States',
//                'short_name': 'US',
//                'types': ['country', 'political']
//            }, {
//                'long_name': '58102',
//                'short_name': '58102',
//                'types': ['postal_code']
//            }],
//            'formatted_address': 'LinkFM #08 - Federal Building (Detour), Fargo, ND 58102, USA',
//            'geometry': {
//                'location': {
//                    'lat': 46.87732099999999,
//                    'lng': -96.789932
//                },
//                'location_type': 'APPROXIMATE',
//                'viewport': {
//                    'northeast': {
//                        'lat': 46.8786699802915,
//                        'lng': -96.78858301970848
//                    },
//                    'southwest': {
//                        'lat': 46.8759720197085,
//                        'lng': -96.7912809802915
//                    }
//                }
//            },
//            'place_id': 'ChIJld6QvGDJyFIR290tu3RI2-M',
//            'types': ['bus_station', 'establishment', 'point_of_interest', 'transit_station']
//        }, {
//            'address_components': [{
//                'long_name': 'Downtown',
//                'short_name': 'Downtown',
//                'types': ['neighborhood', 'political']
//            }, {
//                'long_name': 'Fargo',
//                'short_name': 'Fargo',
//                'types': ['locality', 'political']
//            }, {
//                'long_name': 'Cass County',
//                'short_name': 'Cass County',
//                'types': ['administrative_area_level_2', 'political']
//            }, {
//                'long_name': 'North Dakota',
//                'short_name': 'ND',
//                'types': ['administrative_area_level_1', 'political']
//            }, {
//                'long_name': 'United States',
//                'short_name': 'US',
//                'types': ['country', 'political']
//            }],
//            'formatted_address': 'Downtown, Fargo, ND, USA',
//            'geometry': {
//                'bounds': {
//                    'northeast': {
//                        'lat': 46.88616409999999,
//                        'lng': -96.7755577
//                    },
//                    'southwest': {
//                        'lat': 46.866664,
//                        'lng': -96.801259
//                    }
//                },
//                'location': {
//                    'lat': 46.8789214,
//                    'lng': -96.7920671
//                },
//                'location_type': 'APPROXIMATE',
//                'viewport': {
//                    'northeast': {
//                        'lat': 46.88616409999999,
//                        'lng': -96.7755577
//                    },
//                    'southwest': {
//                        'lat': 46.866664,
//                        'lng': -96.801259
//                    }
//                }
//            },
//            'place_id': 'ChIJn5J-_l3JyFIRQkv2GPvonRo',
//            'types': ['neighborhood', 'political']
//        }, {
//            'address_components': [{
//                'long_name': 'Fargo',
//                'short_name': 'Fargo',
//                'types': ['locality', 'political']
//            }, {
//                'long_name': 'Cass County',
//                'short_name': 'Cass County',
//                'types': ['administrative_area_level_2', 'political']
//            }, {
//                'long_name': 'North Dakota',
//                'short_name': 'ND',
//                'types': ['administrative_area_level_1', 'political']
//            }, {
//                'long_name': 'United States',
//                'short_name': 'US',
//                'types': ['country', 'political']
//            }],
//            'formatted_address': 'Fargo, ND, USA',
//            'geometry': {
//                'bounds': {
//                    'northeast': {
//                        'lat': 46.976966,
//                        'lng': -96.7532568
//                    },
//                    'southwest': {
//                        'lat': 46.7314298,
//                        'lng': -96.90377079999999
//                    }
//                },
//                'location': {
//                    'lat': 46.8771863,
//                    'lng': -96.7898034
//                },
//                'location_type': 'APPROXIMATE',
//                'viewport': {
//                    'northeast': {
//                        'lat': 46.976966,
//                        'lng': -96.7532568
//                    },
//                    'southwest': {
//                        'lat': 46.7314298,
//                        'lng': -96.90377079999999
//                    }
//                }
//            },
//            'place_id': 'ChIJRXFnhI3LyFIRyqqRJ6UwqoE',
//            'types': ['locality', 'political']
//        }, {
//            'address_components': [{
//                'long_name': '58109',
//                'short_name': '58109',
//                'types': ['postal_code']
//            }, {
//                'long_name': 'Downtown',
//                'short_name': 'Downtown',
//                'types': ['neighborhood', 'political']
//            }, {
//                'long_name': 'Fargo',
//                'short_name': 'Fargo',
//                'types': ['locality', 'political']
//            }, {
//                'long_name': 'Cass County',
//                'short_name': 'Cass County',
//                'types': ['administrative_area_level_2', 'political']
//            }, {
//                'long_name': 'North Dakota',
//                'short_name': 'ND',
//                'types': ['administrative_area_level_1', 'political']
//            }, {
//                'long_name': 'United States',
//                'short_name': 'US',
//                'types': ['country', 'political']
//            }],
//            'formatted_address': 'Fargo, ND 58109, USA',
//            'geometry': {
//                'location': {
//                    'lat': 46.87668739999999,
//                    'lng': -96.7894491
//                },
//                'location_type': 'APPROXIMATE',
//                'viewport': {
//                    'northeast': {
//                        'lat': 46.87803638029149,
//                        'lng': -96.7881001197085
//                    },
//                    'southwest': {
//                        'lat': 46.87533841970849,
//                        'lng': -96.79079808029151
//                    }
//                }
//            },
//            'place_id': 'ChIJ9yGNpCjNyFIRz4sqDWIls-8',
//            'types': ['postal_code']
//        }, {
//            'address_components': [{
//                'long_name': '58102',
//                'short_name': '58102',
//                'types': ['postal_code']
//            }, {
//                'long_name': 'Fargo',
//                'short_name': 'Fargo',
//                'types': ['locality', 'political']
//            }, {
//                'long_name': 'Cass County',
//                'short_name': 'Cass County',
//                'types': ['administrative_area_level_2', 'political']
//            }, {
//                'long_name': 'North Dakota',
//                'short_name': 'ND',
//                'types': ['administrative_area_level_1', 'political']
//            }, {
//                'long_name': 'United States',
//                'short_name': 'US',
//                'types': ['country', 'political']
//            }],
//            'formatted_address': 'Fargo, ND 58102, USA',
//            'geometry': {
//                'bounds': {
//                    'northeast': {
//                        'lat': 47.000453,
//                        'lng': -96.7532568
//                    },
//                    'southwest': {
//                        'lat': 46.782383,
//                        'lng': -96.92506200000001
//                    }
//                },
//                'location': {
//                    'lat': 46.9223429,
//                    'lng': -96.840133
//                },
//                'location_type': 'APPROXIMATE',
//                'viewport': {
//                    'northeast': {
//                        'lat': 47.000453,
//                        'lng': -96.7532568
//                    },
//                    'southwest': {
//                        'lat': 46.873813,
//                        'lng': -96.92506200000001
//                    }
//                }
//            },
//            'place_id': 'ChIJXfeQCXPKyFIRmV6lJv19hoE',
//            'postcode_localities': ['Fargo', 'North River', "Reile's Acres"],
//            'types': ['postal_code']
//        }, {
//            'address_components': [{
//                'long_name': 'Cass County',
//                'short_name': 'Cass County',
//                'types': ['administrative_area_level_2', 'political']
//            }, {
//                'long_name': 'North Dakota',
//                'short_name': 'ND',
//                'types': ['administrative_area_level_1', 'political']
//            }, {
//                'long_name': 'United States',
//                'short_name': 'US',
//                'types': ['country', 'political']
//            }],
//            'formatted_address': 'Cass County, ND, USA',
//            'geometry': {
//                'bounds': {
//                    'northeast': {
//                        'lat': 47.239978,
//                        'lng': -96.7532568
//                    },
//                    'southwest': {
//                        'lat': 46.6293119,
//                        'lng': -97.7061789
//                    }
//                },
//                'location': {
//                    'lat': 47.071168,
//                    'lng': -97.12155790000001
//                },
//                'location_type': 'APPROXIMATE',
//                'viewport': {
//                    'northeast': {
//                        'lat': 47.239978,
//                        'lng': -96.7532568
//                    },
//                    'southwest': {
//                        'lat': 46.6293119,
//                        'lng': -97.7061789
//                    }
//                }
//            },
//            'place_id': 'ChIJiRfpqd84z1IR5yOk8RV5cvE',
//            'types': ['administrative_area_level_2', 'political']
//        }, {
//            'address_components': [{
//                'long_name': 'Fargo',
//                'short_name': 'Fargo',
//                'types': ['political']
//            }, {
//                'long_name': 'United States',
//                'short_name': 'US',
//                'types': ['country', 'political']
//            }],
//            'formatted_address': 'Fargo, USA',
//            'geometry': {
//                'bounds': {
//                    'northeast': {
//                        'lat': 47.2400391,
//                        'lng': -96.17227009999999
//                    },
//                    'southwest': {
//                        'lat': 46.6291531,
//                        'lng': -97.7061171
//                    }
//                },
//                'location': {
//                    'lat': 47.071168,
//                    'lng': -97.12155790000001
//                },
//                'location_type': 'APPROXIMATE',
//                'viewport': {
//                    'northeast': {
//                        'lat': 47.2400391,
//                        'lng': -96.17227009999999
//                    },
//                    'southwest': {
//                        'lat': 46.6291531,
//                        'lng': -97.7061171
//                    }
//                }
//            },
//            'place_id': 'ChIJ25xg6Yw1z1IRXmjap8fq35U',
//            'types': ['political']
//        }, {
//            'address_components': [{
//                'long_name': 'North Dakota',
//                'short_name': 'ND',
//                'types': ['administrative_area_level_1', 'establishment', 'point_of_interest', 'political']
//            }, {
//                'long_name': 'United States',
//                'short_name': 'US',
//                'types': ['country', 'political']
//            }],
//            'formatted_address': 'North Dakota, USA',
//            'geometry': {
//                'bounds': {
//                    'northeast': {
//                        'lat': 49.000692,
//                        'lng': -96.554491
//                    },
//                    'southwest': {
//                        'lat': 45.9350719,
//                        'lng': -104.05004
//                    }
//                },
//                'location': {
//                    'lat': 47.5514926,
//                    'lng': -101.0020119
//                },
//                'location_type': 'APPROXIMATE',
//                'viewport': {
//                    'northeast': {
//                        'lat': 49.000692,
//                        'lng': -96.554491
//                    },
//                    'southwest': {
//                        'lat': 45.9350719,
//                        'lng': -104.05004
//                    }
//                }
//            },
//            'place_id': 'ChIJY-nYVxKD11IRyc9egzmahA0',
//            'types': ['administrative_area_level_1', 'establishment', 'point_of_interest', 'political']
//        }, {
//            'address_components': [{
//                'long_name': 'United States',
//                'short_name': 'US',
//                'types': ['country', 'political']
//            }],
//            'formatted_address': 'United States',
//            'geometry': {
//                'bounds': {
//                    'northeast': {
//                        'lat': 71.5388001,
//                        'lng': -66.885417
//                    },
//                    'southwest': {
//                        'lat': 18.7763,
//                        'lng': 170.5957
//                    }
//                },
//                'location': {
//                    'lat': 37.09024,
//                    'lng': -95.712891
//                },
//                'location_type': 'APPROXIMATE',
//                'viewport': {
//                    'northeast': {
//                        'lat': 49.38,
//                        'lng': -66.94
//                    },
//                    'southwest': {
//                        'lat': 25.82,
//                        'lng': -124.39
//                    }
//                }
//            },
//            'place_id': 'ChIJCzYy5IS16lQRQrfeQ5K5Oxw',
//            'types': ['country', 'political']
//        }],
//        'status': 'OK'
////    } //address api
//
