using System;

namespace SleipnirCMS
{
	public class ContentDocument
	{
		public string Id { get; set; }
		public string Name { get; set; }
		public string Lang { get; set; }
		public DateTime Created { get; set; }
		public string Body { get; set; }
		public DateTime Published { get; set; }
	}
}