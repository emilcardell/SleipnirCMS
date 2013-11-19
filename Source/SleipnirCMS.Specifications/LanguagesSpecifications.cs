using System.Collections.Generic;
using System.Linq;
using FluentAssertions;
using Nancy.Testing;
using Raven.Client.Embedded;
using Xunit;

namespace SleipnirCMS.Specifications
{
	public class when_adding_languages_to_be_used
	{
		private readonly Browser browser;

		public when_adding_languages_to_be_used()
		{

			browser = new Browser(with =>
			{
				with.Module<LanguageModule>();
				with.Dependency(new EmbeddableDocumentStore() {RunInMemory = true}.Initialize().OpenSession());
			});

			browser.Post("/language/sv", with =>
			{
			});
		}

		[Fact]
		public void when_a_language_is_added_it_can_be_returned()
		{
			var response = browser.Get("/languages", with => with.HttpRequest());
			var languages = response.Body.DeserializeJson<List<Language>>();
			languages.Count().Should().Be(1);
		}
	}
}
