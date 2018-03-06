(function ()
{
	"use strict";
	
	flash.createPackage("flash.net");
	
	flash.net.navigateToURL = function (request, type)
	{
		if (request)
		{
			switch (type)
			{
				case "_self":// ��������� ������� ����� � ������� ����.
					window.location.href = request.get_url();
					break;
				
				case "_blank":// ���������� ����� ����.
				case "_parent":// ��������� ������������ ������ �������� ������.
				case "_top":// ��������� ����� ������ �������� ������ � ������� ����.
				default:
					window.open(request.get_url());
					break;
			}
		}
		else
		{
			throw new Error("Request must not be null.");
		}
	};
}
());