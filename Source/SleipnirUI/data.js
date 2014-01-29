{
    "type":"address",
    "fields":
	[
	{
		"name": "street",
		"type": "chapter"
	},
	{
		"name": "city",
		"type": "chapter"
	},
	{
		"name": "Duck",
		"type": "object",
		"fields" : [
			{ "name" : "NumberOfDucklings" }
		]
},
	{
		"name": "listOfCoolThings",
		"type": "array",
		"objectName": "Person",
		"requiered": true,
		"defaultValue": "LasseMaja",
        "fields": [
                 { "name":"Firsname" },
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