using FluentAssertions;
using Nancy;
using Nancy.Testing;
using Raven.Client.Embedded;
using Xunit;

namespace SleipnirCMS.Specifications
{
	
	public class when_document_is_created
	{
		private HttpStatusCode creationHttpStatusCode = HttpStatusCode.BadRequest;
		private const string BodyData = "{ Data:\"Data\" }";
		private readonly Browser browser;
		
		public when_document_is_created()
		{
			//bootstrapper = new SpecificationBootstrapper();
			browser = new Browser(with =>
			{
				with.Module<ContentModule>();
				with.Dependency(new EmbeddableDocumentStore() {RunInMemory = true}.Initialize().OpenSession());
			});

			var response = browser.Post("/content/sv/startpage", with =>
			{
				with.HttpRequest();
				with.Body(BodyData);
			});

			creationHttpStatusCode = response.StatusCode;
		}

		[Fact]
		public void it_should_respond_with_ok_status_code()
		{
			creationHttpStatusCode.Should().Be(HttpStatusCode.OK);
		}

		[Fact]
		public void when_requested_by_name_and_language_it_should_be_returned()
		{
			var response = browser.Get("/content/sv/startpage", with => with.HttpsRequest());

			response.Body.AsString().Should().BeEquivalentTo(BodyData);
		}
	}
}
