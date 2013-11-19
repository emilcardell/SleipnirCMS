using System.Collections.Generic;
using FluentAssertions;
using Nancy;
using Nancy.Testing;
using Raven.Client.Embedded;
using Xunit;

namespace SleipnirCMS.Specifications
{
	
	public class when_document_with_same_name_is_saved_again
	{
		private const string BodyDataVer1 = "version1";
		private const string BodyDataVer2 = "version2";

		private readonly Browser browser;

		public when_document_with_same_name_is_saved_again()
		{

			browser = new Browser(with =>
			{
				with.Module<ContentModule>();
				with.Dependency(new EmbeddableDocumentStore() {RunInMemory = true}.Initialize().OpenSession());
			});

			browser.Post("/content/sv/startpage", with =>
			{
				with.HttpRequest();
				with.Body(BodyDataVer1);
			});
			browser.Post("/content/sv/startpage", with =>
			{
				with.HttpRequest();
				with.Body(BodyDataVer2);
			});

		}

		[Fact]
		public void when_requested_by_name_and_language_latest_version_should_be_returned()
		{
			var response = browser.Get("/content/sv/startpage", with => with.HttpsRequest());

			response.Body.AsString().Should().BeEquivalentTo(BodyDataVer2);
		}

		[Fact]
		public void when_versions_are_requested_by_name_and_language_all_versions_should_be_returned()
		{
			var response = browser.Get("/content/versions/sv/startpage", with => with.HttpRequest());

			var versions = response.Body.DeserializeJson<List<ContentDocument>>();
			versions.Count.Should().Be(2);
		}
	}
}
