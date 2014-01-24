using System;
using System.Collections.Generic;
using System.IO;
using Nancy;
using Nancy.ModelBinding;
using Raven.Abstractions.Data;
using Raven.Abstractions.Json;
using Raven.Client;
using Raven.Json.Linq;

namespace SleipnirCMS
{
	public class MetaDataModule : NancyModule
	{
		public MetaDataModule(IDocumentSession documentSession)
		{
			Post["/ContentMetaData/{name}"] = _ =>
			{
				var body = new StreamReader(Request.Body).ReadToEnd();
				
				var metadata = this.Bind<ContentMetaData>();
				metadata.Id = Guid.NewGuid().ToString();

				documentSession.Store(metadata);
				documentSession.SaveChanges();

				return Response.AsJson(new {metadata.Id});

			};

			Get["/ContentMetaData/{name}"] = _ =>
			{

				return "No";
			};
		}
	}

	public class ContentMetaData
	{
		public ContentMetaData()
		{
			Properties = new List<PropertyInformation>();
		}
		public string Id { get; set; }
		public string Name { get; set; }
		public DateTime Created { get; set; }
		public List<PropertyInformation> Properties { get; set; }
	}

	public class PropertyInformation
	{
		public string Name { get; set; }
		public string Description { get; set; }
		public string PropertyType { get; set; }
		public bool Required { get; set; }
	}
}