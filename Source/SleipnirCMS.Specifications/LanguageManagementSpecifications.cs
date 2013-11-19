
using System.Collections.Generic;
using System.Linq;
using FluentAssertions;
using Nancy;
using Nancy.Testing;
using Raven.Client.Embedded;
using Xunit;

namespace SleipnirCMS.Specifications
{
	public class when_a_document_is_created_in_two_different_languages
	{
		private const string SvBodyData = "Sverige";
		private const string NoBodyData = "Norge";
		private readonly Browser browser;

		public when_a_document_is_created_in_two_different_languages()
		{
			//bootstrapper = new SpecificationBootstrapper();
			browser = new Browser(with =>
			{
				with.Module<ContentModule>();
				with.Dependency(new EmbeddableDocumentStore() {RunInMemory = true}.Initialize().OpenSession());
			});

			browser.Post("/content/sv/endpage", with =>
			{
				with.HttpRequest();
				with.Body(SvBodyData);
			});

			browser.Post("/content/no/endpage", with =>
			{
				with.HttpRequest();
				with.Body(NoBodyData);
			});
		}

		[Fact]
		public void it_should_return_two_languages_in_content_list_by_languages()
		{
			var response = browser.Get("/content/langs/endpage", with => with.HttpRequest());
			var languageVersions = response.Body.DeserializeJson<List<ContentDocument>>();
			languageVersions.Count().Should().Be(2);
		}
	}
}
