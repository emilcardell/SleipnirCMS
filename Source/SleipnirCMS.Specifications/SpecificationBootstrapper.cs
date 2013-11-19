using Nancy;
using Nancy.TinyIoc;
using Raven.Client;
using Raven.Client.Embedded;

namespace SleipnirCMS.Specifications
{
	public class SpecificationBootstrapper : DefaultNancyBootstrapper
	{
		protected override void ConfigureApplicationContainer(TinyIoCContainer container)
		{
			container.Register<IDocumentStore>(new EmbeddableDocumentStore() { RunInMemory = true });
			base.ConfigureApplicationContainer(container);
			
		}


		protected override void ConfigureRequestContainer(TinyIoCContainer container, NancyContext context)
		{
			var documentStore = container.Resolve<IDocumentStore>();
			var documentSession = documentStore.OpenSession();
			base.ConfigureRequestContainer(container, context);
			container.Register(documentSession);
		}
	}
}
