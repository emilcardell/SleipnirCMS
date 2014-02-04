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
		"name": "Duck",
		"type": "object",
		"fields" : [
			{ "name" : "Rase" },
			{ "name" : "Gender" }
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
							 { "name":"Lastname" }
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