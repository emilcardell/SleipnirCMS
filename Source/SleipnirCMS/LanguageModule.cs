using System;
using System.IO;
using System.Linq;
using System.Net.Mime;
using Nancy;
using Raven.Abstractions.Extensions;
using Raven.Client;
using Raven.Imports.Newtonsoft.Json;

namespace SleipnirCMS
{
	public class LanguageModule: NancyModule
	{
		public LanguageModule(IDocumentSession documentSession)
		{
			Post["/language/{name}"] = _ =>
			{		
				var id = Guid.NewGuid().ToString();
				string name = _.name;
				name = name.ToLower();
				
				documentSession.Store(new Language
				{
					Id = id,
					Name = name
				});
				documentSession.SaveChanges();
				return Response.AsJson(new {Id = id});
			};

			Get["/languages"] = _ =>
			{
				var result = documentSession.Query<Language>().OrderBy(cd => cd.Name).ToList();
				return Response.AsJson(result);
			};

		}

		
	}

	public class Language
	{
		public string Id { get; set; }
		public string Name { get; set; }
	}
}