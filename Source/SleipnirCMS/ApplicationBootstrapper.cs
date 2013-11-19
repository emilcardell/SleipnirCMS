using Nancy;
using Nancy.TinyIoc;
using Raven.Client;
using Raven.Client.Document;

namespace SleipnirCMS
{
	public class ApplicationBootstrapper : DefaultNancyBootstrapper 
	{
		protected override void ConfigureApplicationContainer(TinyIoCContainer container)
		{
			container.Register<IDocumentStore>(new DocumentStore() {ConnectionStringName = "SleipnirCMS"}).AsSingleton();
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