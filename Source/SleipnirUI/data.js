{
    "fields":
	[
	{
		"name": "Street",
		"type": "string"
	},
	{
		"name": "City",
		"type": "string"
	},
	{
		"name": "Land",
		"type": "object",
		"fields" : [
			{ "name" : "invanare" },
			{ "name" : "nationalratt" }
		]
},
	{
		"name": "listOfCoolThings",
		"type": "array",
		"objectName": "Person",
		"fields": [
                 { "name":"Firstname" },
                 { "name":"Lastname" },
				{
					"name": "Siblings",
					"type": "array",
					"objectName": "Sibling",
					"fields": [
							 { "name":"Firsname" },
							 { "name":"Lastname" },
							 {
							 	"name": "Pets",
							 	"type": "array",
							 	"objectName": "Dog",
							 	"requiered": true,
							 	"defaultValue": "LasseMaja",
							 	"fields": [
										 { "name":"Name" }
							 	]

							 }
						 ]
				}
            ]

	},
	{
		"name": "ListOfCats",
		"type": "array",
		"objectName": "Cat",
		"requiered": true,
		"defaultValue": "LasseMaja",
		"fields": [
                 { "name":"Catname" }
		]

	}
    ]
}