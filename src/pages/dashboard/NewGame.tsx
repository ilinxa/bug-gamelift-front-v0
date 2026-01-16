import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardHeader } from '@/components/DashboardHeader';
import {
  MultiStepForm,
  FormInput,
  FormTextarea,
  FormSelect,
  FormFileUpload,
  FormDatePicker,
  FormTagInput,
  FormListInput,
  FormUserSearch,
  UserOption,
} from '@/components/forms';
import { FormField } from '@/components/forms/FormField';
import { genres, platforms, statuses, sampleUsers } from '@/data/dummyData';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Globe, Lock } from 'lucide-react';

interface GameFormData {
  // Step 1: Game Info
  gameName: string;
  aboutGame: string;
  tags: string[];
  genre: string;
  platform: string;
  status: string;
  coverPhoto: File | null;
  images: File[] | null;
  videoUrl: string;
  
  // Step 2: Playtest Info
  playtestName: string;
  playtestVersion: string;
  playtestGoal: string;
  testObjectives: string[];
  startDate: Date | undefined;
  endDate: Date | undefined;
  isPrivate: boolean;
  invitedUsers: UserOption[];
  
  // Step 3: Game Files
  gameFile: File | null;
}

const initialFormData: GameFormData = {
  gameName: '',
  aboutGame: '',
  tags: [],
  genre: '',
  platform: '',
  status: '',
  coverPhoto: null,
  images: null,
  videoUrl: '',
  playtestName: '',
  playtestVersion: '',
  playtestGoal: '',
  testObjectives: [''],
  startDate: undefined,
  endDate: undefined,
  isPrivate: false,
  invitedUsers: [],
  gameFile: null,
};

const steps = [
  { id: 'game-info', title: 'Game Info', description: 'Basic details' },
  { id: 'playtest', title: 'Playtest', description: 'Test configuration' },
  { id: 'files', title: 'Game Files', description: 'Upload executable' },
];

export default function NewGame() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<GameFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = <K extends keyof GameFormData>(field: K, value: GameFormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // For now, just log the form data
    console.log('=== NEW GAME FORM SUBMISSION ===');
    console.log('Game Info:', {
      gameName: formData.gameName,
      aboutGame: formData.aboutGame,
      tags: formData.tags,
      genre: formData.genre,
      platform: formData.platform,
      status: formData.status,
      coverPhoto: formData.coverPhoto?.name,
      images: formData.images?.map(f => f.name),
      videoUrl: formData.videoUrl,
    });
    console.log('Playtest Info:', {
      playtestName: formData.playtestName,
      playtestVersion: formData.playtestVersion,
      playtestGoal: formData.playtestGoal,
      testObjectives: formData.testObjectives,
      startDate: formData.startDate,
      endDate: formData.endDate,
      isPrivate: formData.isPrivate,
      invitedUsers: formData.invitedUsers,
    });
    console.log('Game Files:', {
      gameFile: formData.gameFile?.name,
    });
    console.log('================================');

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    navigate('/dashboard/my-games');
  };

  const handleCancel = () => {
    navigate('/dashboard/my-games');
  };

  const genreOptions = genres.map((g) => ({ value: g, label: g }));
  const platformOptions = platforms.map((p) => ({ value: p, label: p }));
  const statusOptions = statuses.map((s) => ({ value: s.value, label: s.label }));

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <DashboardHeader 
        title="Create New Game" 
        subtitle="Add a new game to your collection"
      />
      
      <div className="flex-1 p-6">
        <div className="max-w-3xl mx-auto bg-card border border-border rounded-xl p-6 md:p-8">
          <MultiStepForm
            steps={steps}
            currentStep={currentStep}
            onStepChange={setCurrentStep}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isSubmitting={isSubmitting}
            submitText="Create Game"
          >
            {/* Step 1: Game Info */}
            {currentStep === 0 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground">Game Information</h3>
                
                <FormInput
                  label="Game Name"
                  value={formData.gameName}
                  onChange={(v) => updateField('gameName', v)}
                  placeholder="Enter your game name"
                  required
                />
                
                <FormTextarea
                  label="About this Game"
                  value={formData.aboutGame}
                  onChange={(v) => updateField('aboutGame', v)}
                  placeholder="Describe your game..."
                  rows={4}
                  required
                />
                
                <FormTagInput
                  label="Tags"
                  value={formData.tags}
                  onChange={(v) => updateField('tags', v)}
                  placeholder="Add tags and press Enter"
                  description="Add up to 10 tags to help players find your game"
                />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormSelect
                    label="Genre"
                    value={formData.genre}
                    onChange={(v) => updateField('genre', v)}
                    options={genreOptions}
                    placeholder="Select genre"
                    required
                  />
                  
                  <FormSelect
                    label="Platform"
                    value={formData.platform}
                    onChange={(v) => updateField('platform', v)}
                    options={platformOptions}
                    placeholder="Select platform"
                    required
                  />
                  
                  <FormSelect
                    label="Status"
                    value={formData.status}
                    onChange={(v) => updateField('status', v)}
                    options={statusOptions}
                    placeholder="Select status"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormFileUpload
                    label="Cover Photo"
                    value={formData.coverPhoto}
                    onChange={(v) => updateField('coverPhoto', v as File | null)}
                    accept="image/*"
                    variant="image"
                    description="Recommended: 1920x1080"
                  />
                  
                  <FormFileUpload
                    label="Gallery Images"
                    value={formData.images}
                    onChange={(v) => updateField('images', v as File[] | null)}
                    accept="image/*"
                    multiple
                    variant="image"
                    description="Upload multiple screenshots"
                  />
                </div>
                
                <FormInput
                  label="Video URL"
                  value={formData.videoUrl}
                  onChange={(v) => updateField('videoUrl', v)}
                  placeholder="https://youtube.com/watch?v=..."
                  description="YouTube video URL for your game trailer"
                />
              </div>
            )}

            {/* Step 2: Playtest Info */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground">Playtest Configuration</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInput
                    label="Playtest Name"
                    value={formData.playtestName}
                    onChange={(v) => updateField('playtestName', v)}
                    placeholder="e.g., Beta Test v1.0"
                    required
                  />
                  
                  <FormInput
                    label="Version"
                    value={formData.playtestVersion}
                    onChange={(v) => updateField('playtestVersion', v)}
                    placeholder="e.g., 1.0.0"
                    required
                  />
                </div>
                
                <FormTextarea
                  label="Main Goal of Playtest"
                  value={formData.playtestGoal}
                  onChange={(v) => updateField('playtestGoal', v)}
                  placeholder="What do you want to achieve with this playtest?"
                  rows={3}
                  required
                />
                
                <FormListInput
                  label="Test Objectives"
                  value={formData.testObjectives}
                  onChange={(v) => updateField('testObjectives', v)}
                  placeholder="Enter objective"
                  addButtonText="Add Objective"
                  description="Define specific objectives for testers"
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormDatePicker
                    label="Start Date"
                    value={formData.startDate}
                    onChange={(v) => updateField('startDate', v)}
                    placeholder="Select start date"
                    required
                  />
                  
                  <FormDatePicker
                    label="End Date"
                    value={formData.endDate}
                    onChange={(v) => updateField('endDate', v)}
                    placeholder="Select end date"
                    minDate={formData.startDate}
                    required
                  />
                </div>

                {/* Visibility Toggle */}
                <FormField label="Playtest Visibility" description="Control who can access your playtest">
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 border border-border">
                    <div 
                      className={`flex items-center gap-2 flex-1 cursor-pointer transition-opacity ${!formData.isPrivate ? 'opacity-100' : 'opacity-50'}`}
                      onClick={() => updateField('isPrivate', false)}
                    >
                      <Globe className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Public</p>
                        <p className="text-xs text-muted-foreground">Anyone can join</p>
                      </div>
                    </div>
                    
                    <Switch
                      checked={formData.isPrivate}
                      onCheckedChange={(checked) => updateField('isPrivate', checked)}
                    />
                    
                    <div 
                      className={`flex items-center gap-2 flex-1 cursor-pointer transition-opacity ${formData.isPrivate ? 'opacity-100' : 'opacity-50'}`}
                      onClick={() => updateField('isPrivate', true)}
                    >
                      <Lock className="h-5 w-5 text-amber-500" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Private</p>
                        <p className="text-xs text-muted-foreground">Invite only</p>
                      </div>
                    </div>
                  </div>
                </FormField>

                {/* Invite Users (only for private) */}
                {formData.isPrivate && (
                  <FormUserSearch
                    label="Invite Playtesters"
                    value={formData.invitedUsers}
                    onChange={(v) => updateField('invitedUsers', v)}
                    users={sampleUsers}
                    placeholder="Search by name or username..."
                    description="Search and add users to invite to your private playtest"
                  />
                )}
              </div>
            )}

            {/* Step 3: Game Files */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground">Game Executable</h3>
                
                <p className="text-muted-foreground">
                  Upload your game executable in a compressed format. This file will be available 
                  for playtesters to download.
                </p>
                
                <FormFileUpload
                  label="Game File"
                  value={formData.gameFile}
                  onChange={(v) => updateField('gameFile', v as File | null)}
                  accept=".rar,.zip,.7z"
                  variant="archive"
                  required
                  description="Accepted formats: .rar, .zip, .7z"
                />
                
                <div className="bg-muted/30 border border-border rounded-lg p-4">
                  <h4 className="font-medium text-foreground mb-2">Summary</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p><span className="text-foreground">Game:</span> {formData.gameName || 'Not set'}</p>
                    <p><span className="text-foreground">Playtest:</span> {formData.playtestName || 'Not set'}</p>
                    <p><span className="text-foreground">Version:</span> {formData.playtestVersion || 'Not set'}</p>
                    <p><span className="text-foreground">Duration:</span> {formData.startDate && formData.endDate 
                      ? `${formData.startDate.toLocaleDateString()} - ${formData.endDate.toLocaleDateString()}`
                      : 'Not set'
                    }</p>
                  </div>
                </div>
              </div>
            )}
          </MultiStepForm>
        </div>
      </div>
    </div>
  );
}
