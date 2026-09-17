import React, { useState } from "react";
import {
  Upload,
  MapPin,
  Wrench,
  ChevronDown,
  X,
  Plus,
  Briefcase,
  Phone,
  Info,
  ArrowRight,
  Camera,
} from "lucide-react";
import { Photos } from "./BackendForms";
import { TOWNS } from "../data/mockData";

export default function WorkerProfileSetupPage({
  onSave,
  currentUser,
  profile,
}) {
  const [displayName, setDisplayName] = useState(currentUser.name || "");
  const [trade, setTrade] = useState(profile?.trade || "Plumbing");
  const [town, setTown] = useState(currentUser.town || "Kurunegala");
  const [serviceAreas, setServiceAreas] = useState(profile?.serviceAreas || []);
  const [newAreaInput, setNewAreaInput] = useState("");
  const [showAddArea, setShowAddArea] = useState(false);
  const [about, setAbout] = useState(profile?.about || "");
  const [experience, setExperience] = useState(
    profile?.experience || "Less than 1 year",
  );
  const [languages, setLanguages] = useState(
    Object.fromEntries(
      ["Sinhala", "Tamil", "English"].map((l) => [
        l,
        profile?.languages?.includes(l) || false,
      ]),
    ),
  );
  const [phone, setPhone] = useState(currentUser.phone || "");
  const [workPhotos, setWorkPhotos] = useState(profile?.workPhotos || []);
  const [avatar, setAvatar] = useState(currentUser.avatar || "");

  const handleAddArea = () => {
    if (newAreaInput.trim() && !serviceAreas.includes(newAreaInput.trim())) {
      setServiceAreas([...serviceAreas, newAreaInput.trim()]);
      setNewAreaInput("");
      setShowAddArea(false);
    }
  };

  const handleRemoveArea = (area) => {
    setServiceAreas(serviceAreas.filter((a) => a !== area));
  };

  const handleRemovePhoto = (idx) => {
    setWorkPhotos(workPhotos.filter((_, i) => i !== idx));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (onSave) {
      onSave({
        avatar,
        displayName,
        trade,
        town,
        serviceAreas,
        about,
        experience,
        languages: Object.keys(languages).filter((k) => languages[k]),
        phone,
        workPhotos,
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-1 max-w-2xl mx-auto">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Become a worker
        </h1>
        <p className="text-slate-600 text-sm sm:text-base">
          Create your profile and start getting job requests from people near
          you.
        </p>
      </div>

      {/* Main Grid: Form Left (2 cols) & Preview Right (1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Form */}
        <form
          onSubmit={handleSave}
          className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm"
        >
          <div>
            <h2 className="text-lg font-bold text-slate-900">Your profile</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Tell us a bit about yourself so customers can find and trust you.
            </p>
          </div>

          {/* Profile Photo & Display Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800">
                Profile photo
              </label>
              <div className="flex items-center gap-4">
                <img
                  src={avatar || `${import.meta.env.BASE_URL}wrench.svg`}
                  alt="Profile"
                  className="w-16 h-16 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <Photos
                    value={avatar ? [avatar] : []}
                    onChange={(urls) => setAvatar(urls.at(-1) || "")}
                    max={1}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800">
                Display name
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-[#008272] focus:outline-none"
              />
            </div>
          </div>

          {/* Trade & Town */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800">
                Main trade / service
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-600">
                  <Wrench className="w-4 h-4" />
                </div>
                <select
                  value={trade}
                  onChange={(e) => setTrade(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-8 py-2.5 text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-[#008272] focus:outline-none appearance-none"
                >
                  <option value="Plumbing">Plumbing</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Painting">Painting & decorating</option>
                  <option value="Carpentry">Carpentry</option>
                  <option value="Cleaning">Cleaning & housekeeping</option>
                  <option value="Masonry">Masonry</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800">Town</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-700">
                  <MapPin className="w-4 h-4" />
                </div>
                <select
                  value={town}
                  onChange={(e) => setTown(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-8 py-2.5 text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-[#008272] focus:outline-none appearance-none"
                >
                  {TOWNS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Nearby Service Areas */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800">
              Nearby service areas
            </label>
            <div className="flex flex-wrap items-center gap-2 p-2 border border-slate-300 rounded-xl min-h-[46px]">
              {serviceAreas.map((area) => (
                <span
                  key={area}
                  className="bg-slate-100 text-slate-800 text-xs font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1.5"
                >
                  <span>{area}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveArea(area)}
                    className="text-slate-400 hover:text-slate-700"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}

              {showAddArea ? (
                <div className="flex items-center gap-1">
                  <input
                    type="text"
                    value={newAreaInput}
                    onChange={(e) => setNewAreaInput(e.target.value)}
                    placeholder="Town name"
                    className="border border-slate-300 rounded px-2 py-0.5 text-xs w-28 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddArea}
                    className="text-xs bg-[#008272] text-white px-2 py-0.5 rounded font-bold"
                  >
                    Add
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowAddArea(true)}
                  className="text-xs font-bold text-[#008272] hover:text-[#006357] flex items-center gap-1 px-2 py-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add area</span>
                </button>
              )}
            </div>
            <p className="text-[11px] text-slate-500">
              Add towns or areas where you can work.
            </p>
          </div>

          {/* About You */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800">
                About you
              </label>
              <span className="text-[11px] text-slate-400">
                {about.length}/300
              </span>
            </div>
            <textarea
              rows={3}
              maxLength={300}
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="w-full border border-slate-300 rounded-xl p-3 text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-[#008272] focus:outline-none leading-relaxed"
            />
          </div>

          {/* Experience & Languages */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800">
                Years of experience (optional)
              </label>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-[#008272] focus:outline-none"
              >
                <option value="1 - 3 years">1 - 3 years</option>
                <option value="3 - 5 years">3 - 5 years</option>
                <option value="5 - 10 years">5 - 10 years</option>
                <option value="10+ years">10+ years</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800">
                Languages
              </label>
              <div className="flex items-center gap-4 pt-2">
                {["Sinhala", "Tamil", "English"].map((lang) => (
                  <label
                    key={lang}
                    className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 cursor-pointer select-none"
                  >
                    <input
                      type="checkbox"
                      checked={languages[lang]}
                      onChange={(e) =>
                        setLanguages({ ...languages, [lang]: e.target.checked })
                      }
                      className="w-4 h-4 rounded border-slate-300 text-[#008272] focus:ring-[#008272]"
                    />
                    <span>{lang}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Work photos & Contact number */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800">
                Work photos (optional, up to 3)
              </label>
              <Photos value={workPhotos} onChange={setWorkPhotos} />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800">
                Contact number (private)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="077 123 4567"
                  className="w-full border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-[#008272] focus:outline-none"
                />
              </div>
              <p className="text-[10px] text-slate-400">
                Not shown publicly. Used only for job communication.
              </p>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#008272] hover:bg-[#007163] text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
          >
            <span>Save worker profile</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Right Column: Profile Preview (Mint Background) */}
        <div className="bg-[#e6f7f5] border border-[#cbf0ea] rounded-2xl p-6 space-y-4 shadow-sm">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Profile preview
            </h3>
            <p className="text-xs text-slate-600">
              This is how customers may see you on WRENCH.
            </p>
          </div>

          {/* Preview Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-sm">
            <div className="flex items-center gap-3">
              <img
                src={avatar || `${import.meta.env.BASE_URL}wrench.svg`}
                alt="Avatar"
                className="w-16 h-16 rounded-full object-cover border border-slate-200"
              />
              <div className="space-y-0.5">
                <h4 className="text-base font-bold text-slate-900">
                  {displayName}
                </h4>
                <div className="flex items-center gap-1 text-xs text-slate-600">
                  <Wrench className="w-3.5 h-3.5 text-slate-400" />
                  <span>{trade}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-[#008272] font-semibold">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{town}</span>
                </div>
              </div>
            </div>

            {/* Language badges */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {Object.keys(languages)
                .filter((l) => languages[l])
                .map((l) => (
                  <span
                    key={l}
                    className="bg-[#e6f7f5] text-[#008272] text-[10px] font-bold px-2.5 py-0.5 rounded-full"
                  >
                    {l}
                  </span>
                ))}
            </div>

            {/* About */}
            <div className="pt-2 border-t border-slate-100 text-xs">
              <div className="text-slate-400 font-medium">About</div>
              <p className="text-slate-700 mt-0.5 leading-relaxed">{about}</p>
            </div>

            {/* Service areas */}
            <div className="pt-2 border-t border-slate-100 text-xs">
              <div className="text-slate-400 font-medium">Service areas</div>
              <div className="flex items-center gap-1 text-slate-700 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                <span>{serviceAreas.join(", ")}</span>
              </div>
            </div>

            {/* Experience */}
            <div className="pt-2 border-t border-slate-100 text-xs">
              <div className="text-slate-400 font-medium">Experience</div>
              <div className="flex items-center gap-1 text-slate-700 mt-0.5">
                <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                <span>{experience}</span>
              </div>
            </div>

            {/* Work photos */}
            {workPhotos.length > 0 && (
              <div className="pt-2 border-t border-slate-100 text-xs space-y-1">
                <div className="text-slate-400 font-medium">Work photos</div>
                <div className="flex gap-2">
                  {workPhotos.map((p, i) => (
                    <img
                      key={i}
                      src={p}
                      alt="Thumbnail"
                      className="w-12 h-12 rounded-lg object-cover border border-slate-200"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Privacy notice */}
            <div className="pt-3 border-t border-slate-100 flex items-start gap-2 text-[10px] text-slate-500">
              <Info className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
              <span>
                Your contact number is kept private and will only be shared when
                a customer contacts you through WRENCH.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
