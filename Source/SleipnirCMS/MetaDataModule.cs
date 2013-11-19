using System.Collections.Generic;
using Nancy;

namespace SleipnirCMS
{
	public class MetaDataModule : NancyModule
	{
		public MetaDataModule()
		{
			Post["/ContentMetaData/{name}"] = _ =>
			{
				var metaData = new ContentMetaData();
				metaData.Name = "LasseMaja";
				metaData.Properties.Add(new PropertyInformation() { Name="MainBody", PropertyType = "XHTMLEditor", Description = "Main content body", Required = true});
				metaData.Properties.Add(new PropertyInformation() { Name = "Title", PropertyType = "string", Description = "Main content body", Required = true });
				return "NO";
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