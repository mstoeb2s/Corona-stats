// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: teal; icon-glyph: magic;
const apiUrl = "https://services3.arcgis.com/83sMx9VznDQWxJwO/arcgis/rest/services/CoronaFaelle2020/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=NAME%20asc&outSR=102100&resultOffset=0&resultRecordCount=25&resultType=standard&cacheHint=true"


const widget = await createWidget();

if (!config.runsInWidget) {
  await widget.presentSmall();
}

Script.setWidget(widget);
Script.complete();

async function createWidget() {

const data = await new Request(apiUrl).loadJSON();

if (!data || !data.features || !data.features.length) {
    const errorList = new ListWidget();
    errorList.addText('Keine Ergebnisse.');
    return errorList;
  }

//var  l = data.features.length;

var data_w=data.features[18].attributes;


const list = new ListWidget()
  
  if(Device.isUsingDarkAppearance()){
    const gradient = new LinearGradient()
    gradient.locations = [0, 1]
    gradient.colors = [
      new Color("111111"),
      new Color("222222")
    ]
    list.backgroundGradient = gradient
  }
  
  const header = list.addText("🦠 Corona Windeck".toUpperCase())
  header.font = Font.mediumSystemFont(13)
  
  header.textColor = Device.isUsingDarkAppearance() ? Color.white() : Color.black();

  list.addSpacer();

var time = new Date(data_w.Meldedatum);



  var label = list.addText("Infektionen: " + data_w.Infektionen);
  label.font = Font.boldSystemFont(12);
  label.textOpacity = 0.5;
  label.textColor = Device.isUsingDarkAppearance() ? Color.white() : Color.black();
  
  label = list.addText("Genesene: " + data_w.Genesene);
  label.font = Font.boldSystemFont(12);
  label.textOpacity = 0.5;
  label.textColor = Device.isUsingDarkAppearance() ? Color.white() : Color.black();
  
    label = list.addText("Tote: " + data_w.Tote);
  label.font = Font.boldSystemFont(12);
  label.textOpacity = 0.5;
  label.textColor = Device.isUsingDarkAppearance() ? Color.white() : Color.black();
  
    label = list.addText("Aktive Fälle: " + data_w.AktiveFaelle);
  label.font = Font.boldSystemFont(12);
  label.textOpacity = 0.5;
  label.textColor = Device.isUsingDarkAppearance() ? Color.white() : Color.black();

list.addSpacer();
  
  label = list.addText("Stand: " + time.getDate()+"."+(time.getMonth()+1)+"."+time.getFullYear());
  label.font = Font.boldSystemFont(12);
  label.textColor = Device.isUsingDarkAppearance() ? Color.white() : Color.black();  
  
  
 return list;
}