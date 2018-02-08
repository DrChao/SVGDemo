using System;
using System.Collections.Generic;
using System.Web;
using System.Data;
using System.Web.Services;
using System.Xml;
using System.IO;
using System.Diagnostics;

namespace SVG.Convertor
{
    /// <summary>
    /// $codebehindclassname$ 的摘要描述
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    public class convert2png : IHttpHandler
    {
        private string PngRelativeDirectory = "";

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "image/png";

            String svgXml = GetSvgImageXml(context);
            string svgFileName = GetSvgFileName(context);
            using (StreamWriter writer = new StreamWriter(svgFileName, false))
            {
                writer.Write(svgXml);
            }

            string pngFileName = GetPngFileName(context);

            string inkscapeArgs =
             "-f " + svgFileName + " -e \"" +
             context.Server.MapPath(PngRelativeDirectory) + "\\" +
             pngFileName + "\"";

            Process inkscape = Process.Start(
              new ProcessStartInfo(
               "C:\\program files\\inkscape\\inkscape.exe",
               inkscapeArgs));
            inkscape.WaitForExit(3000);
            context.Server.Transfer(PngRelativeDirectory + pngFileName);
            context.Response.Write("Hello World");
        }

        private string GetSvgImageXml(HttpContext context)
        {
            return "";
        }

        private string GetSvgFileName(HttpContext context)
        {
            return "";
        }

        private string GetPngFileName(HttpContext context)
        {
            return "";
        }



        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}
