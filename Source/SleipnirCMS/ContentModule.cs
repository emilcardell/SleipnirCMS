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
	public class ContentModule : NancyModule
	{
		public ContentModule(IDocumentSession documentSession)
		{
			Get["/content/{lang}/{name}"] = _ =>
			{
				string lang = _.lang;
				string name = _.name;
				lang = lang.ToLower();
				name = name.ToLower();
				var result = documentSession.Query<ContentDocument>().OrderByDescending(cd => cd.Published).FirstOrDefault(cd => cd.Name == name && cd.Lang == lang);
				if(result == null)
					return HttpStatusCode.NotFound;
				
				return result.Body;
			};

			Get["/content/versions/{lang}/{name}"] = _ =>
			{
				string name = _.name;
				string lang = _.lang;

				var result = documentSession.Query<ContentDocument>().OrderByDescending(cd => cd.Published).Where(cd => cd.Lang == lang && cd.Name == name).ToList();
				return Response.AsJson(result);
			};

			Get["/content/langs/{name}"] = _ =>
			{
				string name = _.name;
				var result = documentSession.Query<ContentDocument>().Where(cd => cd.Name == name).ToList();

				return Response.AsJson(result);
			};

			Post["/content/{lang}/{name}"] = _ =>
			{
				var body =  new StreamReader(Request.Body).ReadToEnd();
				var id = Guid.NewGuid().ToString();
				string lang = _.lang;
				string name = _.name;
				lang = lang.ToLower();
				name = name.ToLower();
				var content = new ContentDocument()
				{
					Id = id,
					Name = name,
					Lang = lang,
					Created = DateTime.UtcNow,
					Body = body,
					Published = DateTime.UtcNow
					
				};

				documentSession.Store(content);
				documentSession.SaveChanges();

				return Response.AsJson(new {Id = id});
			};

		}

		
	}
}